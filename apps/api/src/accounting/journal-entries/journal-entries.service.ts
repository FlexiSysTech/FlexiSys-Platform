import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  JournalEntrySource,
  JournalEntryStatus,
  Prisma,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateJournalEntryDto } from './dto/create-journal-entry.dto';
import { CreateJournalEntryLineDto } from './dto/create-journal-entry-line.dto';
import { UpdateJournalEntryDto } from './dto/update-journal-entry.dto';
import {
  JournalEntryEntity,
  JournalEntryLineEntity,
} from './entities/journal-entry.entity';

type JournalEntryRecord = {
  id: string;
  companyId: string;
  entryNumber: string;
  entryDate: Date;
  description: string | null;
  status: JournalEntryStatus;
  source: JournalEntrySource;
  sourceRef: string | null;
  totalDebit: Decimal;
  totalCredit: Decimal;
  postedAt: Date | null;
  voidedAt: Date | null;
  createdById: string | null;
  createdAt: Date;
  updatedAt: Date;
  lines: Array<{
    id: string;
    journalEntryId: string;
    accountId: string;
    debit: Decimal;
    credit: Decimal;
    description: string | null;
    employeeId: string | null;
    departmentId: string | null;
    branchId: string | null;
    costCenterId: string | null;
  }>;
};

@Injectable()
export class JournalEntriesService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: JournalEntryRecord): JournalEntryEntity {
    return new JournalEntryEntity({
      ...item,
      totalDebit: item.totalDebit.toNumber(),
      totalCredit: item.totalCredit.toNumber(),
      lines: item.lines.map(
        (line) =>
          new JournalEntryLineEntity({
            ...line,
            debit: line.debit.toNumber(),
            credit: line.credit.toNumber(),
          }),
      ),
    });
  }

  async findAll(): Promise<JournalEntryEntity[]> {
    const items = await this.prisma.journalEntry.findMany({
      include: { lines: true },
      orderBy: { entryDate: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<JournalEntryEntity> {
    const item = await this.prisma.journalEntry.findUnique({
      where: { id },
      include: { lines: true },
    });

    if (!item) {
      throw new NotFoundException('Journal entry not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreateJournalEntryDto): Promise<JournalEntryEntity> {
    await this.ensureCompanyExists(dto.companyId);
    await this.ensureEntryNumberIsUnique(dto.companyId, dto.entryNumber);
    await this.validateLines(dto.companyId, dto.lines);

    if (dto.createdById) {
      await this.ensureUserExists(dto.createdById);
    }

    const totals = this.calculateTotals(dto.lines);
    this.ensureBalanced(totals);

    const item = await this.prisma.$transaction(async (tx) => {
      const journal = await tx.journalEntry.create({
        data: {
          companyId: dto.companyId,
          entryNumber: dto.entryNumber,
          entryDate: new Date(dto.entryDate),
          description: dto.description,
          status: dto.status ?? 'DRAFT',
          source: dto.source ?? 'MANUAL',
          sourceRef: dto.sourceRef,
          totalDebit: totals.debit,
          totalCredit: totals.credit,
          postedAt: dto.status === 'POSTED' ? new Date() : undefined,
          createdById: dto.createdById,
          lines: { create: dto.lines.map((line) => this.toLineData(line)) },
        },
        include: { lines: true },
      });

      await this.audit(tx, 'JOURNAL_ENTRY_CREATE', journal.id, dto.createdById, {
        entryNumber: journal.entryNumber,
        totalDebit: totals.debit,
        totalCredit: totals.credit,
      });

      return journal;
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdateJournalEntryDto,
  ): Promise<JournalEntryEntity> {
    const current = await this.findOne(id);

    if (current.status === 'POSTED') {
      throw new BadRequestException('Posted journal entries cannot be edited');
    }

    const companyId = dto.companyId ?? current.companyId;
    const entryNumber = dto.entryNumber ?? current.entryNumber;

    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    if (dto.companyId || dto.entryNumber) {
      await this.ensureEntryNumberIsUnique(companyId, entryNumber, id);
    }

    if (dto.lines) {
      await this.validateLines(companyId, dto.lines);
      this.ensureBalanced(this.calculateTotals(dto.lines));
    }

    if (dto.createdById) {
      await this.ensureUserExists(dto.createdById);
    }

    const item = await this.prisma.$transaction(async (tx) => {
      if (dto.lines) {
        await tx.journalEntryLine.deleteMany({ where: { journalEntryId: id } });
      }

      const totals = dto.lines ? this.calculateTotals(dto.lines) : undefined;
      const journal = await tx.journalEntry.update({
        where: { id },
        data: {
          companyId: dto.companyId,
          entryNumber: dto.entryNumber,
          entryDate: dto.entryDate ? new Date(dto.entryDate) : undefined,
          description: dto.description,
          status: dto.status,
          source: dto.source,
          sourceRef: dto.sourceRef,
          totalDebit: totals?.debit,
          totalCredit: totals?.credit,
          postedAt: dto.status === 'POSTED' ? new Date() : undefined,
          createdById: dto.createdById,
          lines: dto.lines
            ? { create: dto.lines.map((line) => this.toLineData(line)) }
            : undefined,
        },
        include: { lines: true },
      });

      await this.audit(tx, 'JOURNAL_ENTRY_UPDATE', id, dto.createdById, {
        entryNumber: journal.entryNumber,
      });

      return journal;
    });

    return this.toEntity(item);
  }

  async post(id: string, createdById?: string): Promise<JournalEntryEntity> {
    const current = await this.findOne(id);

    if (current.status !== 'DRAFT') {
      throw new BadRequestException('Only draft journal entries can be posted');
    }

    this.ensureBalanced({
      debit: current.totalDebit,
      credit: current.totalCredit,
    });

    if (createdById) {
      await this.ensureUserExists(createdById);
    }

    const item = await this.prisma.$transaction(async (tx) => {
      const journal = await tx.journalEntry.update({
        where: { id },
        data: { status: 'POSTED', postedAt: new Date() },
        include: { lines: true },
      });

      await this.audit(tx, 'JOURNAL_ENTRY_POST', id, createdById, {
        entryNumber: journal.entryNumber,
      });

      return journal;
    });

    return this.toEntity(item);
  }

  async void(id: string, createdById?: string): Promise<JournalEntryEntity> {
    const current = await this.findOne(id);

    if (current.status === 'VOID') {
      throw new BadRequestException('Journal entry is already void');
    }

    if (createdById) {
      await this.ensureUserExists(createdById);
    }

    const item = await this.prisma.$transaction(async (tx) => {
      const journal = await tx.journalEntry.update({
        where: { id },
        data: { status: 'VOID', voidedAt: new Date() },
        include: { lines: true },
      });

      await this.audit(tx, 'JOURNAL_ENTRY_VOID', id, createdById, {
        entryNumber: journal.entryNumber,
      });

      return journal;
    });

    return this.toEntity(item);
  }

  private toLineData(line: CreateJournalEntryLineDto) {
    return {
      accountId: line.accountId,
      debit: line.debit ?? 0,
      credit: line.credit ?? 0,
      description: line.description,
      employeeId: line.employeeId,
      departmentId: line.departmentId,
      branchId: line.branchId,
      costCenterId: line.costCenterId,
    };
  }

  private calculateTotals(lines: CreateJournalEntryLineDto[]) {
    return lines.reduce(
      (totals, line) => ({
        debit: this.round(totals.debit + (line.debit ?? 0)),
        credit: this.round(totals.credit + (line.credit ?? 0)),
      }),
      { debit: 0, credit: 0 },
    );
  }

  private ensureBalanced(totals: { debit: number; credit: number }): void {
    if (this.round(totals.debit) !== this.round(totals.credit)) {
      throw new BadRequestException('Journal entry must be balanced');
    }
  }

  private async validateLines(
    companyId: string,
    lines: CreateJournalEntryLineDto[],
  ): Promise<void> {
    if (!lines.length) {
      throw new BadRequestException('Journal entry requires at least one line');
    }

    for (const line of lines) {
      const debit = line.debit ?? 0;
      const credit = line.credit ?? 0;

      if (debit <= 0 && credit <= 0) {
        throw new BadRequestException('Each line requires debit or credit');
      }

      if (debit > 0 && credit > 0) {
        throw new BadRequestException('Line cannot have both debit and credit');
      }

      await this.ensureAccountExists(companyId, line.accountId);
      await this.ensureDimensionsExist(line);
    }
  }

  private async ensureCompanyExists(id: string): Promise<void> {
    const company = await this.prisma.company.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }
  }

  private async ensureUserExists(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  private async ensureAccountExists(
    companyId: string,
    accountId: string,
  ): Promise<void> {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
      select: { id: true, companyId: true, status: true },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (account.companyId !== companyId) {
      throw new BadRequestException('Account belongs to another company');
    }

    if (account.status !== 'ACTIVE') {
      throw new BadRequestException('Inactive accounts cannot be used');
    }
  }

  private async ensureDimensionsExist(
    line: CreateJournalEntryLineDto,
  ): Promise<void> {
    await Promise.all([
      line.employeeId
        ? this.prisma.employee.findUnique({ where: { id: line.employeeId } })
        : Promise.resolve(true),
      line.departmentId
        ? this.prisma.department.findUnique({
            where: { id: line.departmentId },
          })
        : Promise.resolve(true),
      line.branchId
        ? this.prisma.branch.findUnique({ where: { id: line.branchId } })
        : Promise.resolve(true),
      line.costCenterId
        ? this.prisma.costCenter.findUnique({
            where: { id: line.costCenterId },
          })
        : Promise.resolve(true),
    ]).then(([employee, department, branch, costCenter]) => {
      if (!employee) throw new NotFoundException('Employee not found');
      if (!department) throw new NotFoundException('Department not found');
      if (!branch) throw new NotFoundException('Branch not found');
      if (!costCenter) throw new NotFoundException('Cost center not found');
    });
  }

  private async ensureEntryNumberIsUnique(
    companyId: string,
    entryNumber: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.journalEntry.findFirst({
      where: {
        companyId,
        entryNumber,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (item) {
      throw new ConflictException(
        'Journal entry number already exists in this company',
      );
    }
  }

  private async audit(
    tx: Prisma.TransactionClient,
    action: string,
    entityId: string,
    createdById: string | undefined,
    payload: Prisma.InputJsonValue,
  ): Promise<void> {
    await tx.auditLog.create({
      data: {
        action,
        entity: 'JournalEntry',
        entityId,
        createdById,
        payload,
      },
    });
  }

  private round(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}
