import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountStatus, AccountType, Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountEntity } from './entities/account.entity';

type AccountRecord = {
  id: string;
  companyId: string;
  parentId: string | null;
  code: string;
  name: string;
  type: AccountType;
  status: AccountStatus;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: AccountRecord): AccountEntity {
    return new AccountEntity(item);
  }

  async findAll(): Promise<AccountEntity[]> {
    const items = await this.prisma.account.findMany({
      orderBy: { code: 'asc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<AccountEntity> {
    const item = await this.prisma.account.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Account not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreateAccountDto): Promise<AccountEntity> {
    await this.ensureCompanyExists(dto.companyId);
    await this.ensureCodeIsUnique(dto.companyId, dto.code);

    if (dto.parentId) {
      await this.ensureParentIsValid(dto.companyId, dto.parentId);
    }

    if (dto.createdById) {
      await this.ensureUserExists(dto.createdById);
    }

    const item = await this.prisma.$transaction(async (tx) => {
      const account = await tx.account.create({
        data: {
          companyId: dto.companyId,
          parentId: dto.parentId,
          code: dto.code,
          name: dto.name,
          type: dto.type,
          status: dto.status ?? 'ACTIVE',
          description: dto.description,
        },
      });

      await this.audit(tx, 'ACCOUNT_CREATE', account.id, dto.createdById, {
        code: account.code,
        name: account.name,
        type: account.type,
      });

      return account;
    });

    return this.toEntity(item);
  }

  async update(id: string, dto: UpdateAccountDto): Promise<AccountEntity> {
    const current = await this.findOne(id);
    const companyId = dto.companyId ?? current.companyId;
    const code = dto.code ?? current.code;

    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    if (dto.companyId || dto.code) {
      await this.ensureCodeIsUnique(companyId, code, id);
    }

    if (dto.parentId) {
      if (dto.parentId === id) {
        throw new BadRequestException('Account cannot be its own parent');
      }

      await this.ensureParentIsValid(companyId, dto.parentId);
      await this.ensureParentDoesNotCreateCycle(id, dto.parentId);
    }

    if (dto.createdById) {
      await this.ensureUserExists(dto.createdById);
    }

    const item = await this.prisma.$transaction(async (tx) => {
      const account = await tx.account.update({
        where: { id },
        data: {
          companyId: dto.companyId,
          parentId: dto.parentId,
          code: dto.code,
          name: dto.name,
          type: dto.type,
          status: dto.status,
          description: dto.description,
        },
      });

      await this.audit(tx, 'ACCOUNT_UPDATE', id, dto.createdById, {
        before: this.toAuditPayload(current),
        after: this.toAuditPayload(account),
      });

      return account;
    });

    return this.toEntity(item);
  }

  async remove(id: string, createdById?: string) {
    const item = await this.findOne(id);
    const childCount = await this.prisma.account.count({
      where: { parentId: id },
    });

    if (childCount > 0) {
      throw new BadRequestException('Account has child accounts');
    }

    if (createdById) {
      await this.ensureUserExists(createdById);
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.account.delete({ where: { id } });
      await this.audit(
        tx,
        'ACCOUNT_DELETE',
        id,
        createdById,
        this.toAuditPayload(item),
      );
    });

    return { success: true, deletedAccount: item };
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

  private async ensureParentIsValid(
    companyId: string,
    parentId: string,
  ): Promise<void> {
    const parent = await this.prisma.account.findUnique({
      where: { id: parentId },
      select: { id: true, companyId: true },
    });

    if (!parent) {
      throw new NotFoundException('Parent account not found');
    }

    if (parent.companyId !== companyId) {
      throw new BadRequestException('Parent account belongs to another company');
    }
  }

  private async ensureParentDoesNotCreateCycle(
    accountId: string,
    parentId: string,
  ): Promise<void> {
    let currentParentId: string | null = parentId;

    while (currentParentId) {
      if (currentParentId === accountId) {
        throw new BadRequestException('Account hierarchy cycle is not allowed');
      }

      const parent = await this.prisma.account.findUnique({
        where: { id: currentParentId },
        select: { parentId: true },
      });

      currentParentId = parent?.parentId ?? null;
    }
  }

  private async ensureCodeIsUnique(
    companyId: string,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.account.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (item) {
      throw new ConflictException('Account code already exists in this company');
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
        entity: 'Account',
        entityId,
        createdById,
        payload,
      },
    });
  }

  private toAuditPayload(account: AccountRecord | AccountEntity) {
    return {
      id: account.id,
      companyId: account.companyId,
      parentId: account.parentId,
      code: account.code,
      name: account.name,
      type: account.type,
      status: account.status,
      description: account.description,
    };
  }
}
