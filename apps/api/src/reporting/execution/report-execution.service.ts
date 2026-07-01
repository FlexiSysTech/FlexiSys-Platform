import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateReportExecutionDto } from './dto/create-report-execution.dto';
import { ReportExecutionEntity } from './entities/report-execution.entity';

@Injectable()
export class ReportExecutionService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ReportExecutionEntity[]> {
    const items = await this.prisma.reportExecution.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return items.map((item) => new ReportExecutionEntity(item));
  }

  async findOne(id: string): Promise<ReportExecutionEntity> {
    const item = await this.prisma.reportExecution.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Report execution not found');
    return new ReportExecutionEntity(item);
  }

  async start(dto: CreateReportExecutionDto): Promise<ReportExecutionEntity> {
    if (dto.companyId) await this.ensureCompanyExists(dto.companyId);
    if (dto.reportId) await this.ensureReportExists(dto.reportId);
    if (dto.executedById) await this.ensureUserExists(dto.executedById);

    const item = await this.prisma.reportExecution.create({
      data: {
        companyId: dto.companyId,
        reportId: dto.reportId,
        handler: dto.handler,
        status: 'RUNNING',
        format: dto.format ?? 'JSON',
        parameters:
          dto.parameters === undefined
            ? Prisma.JsonNull
            : (dto.parameters as Prisma.InputJsonValue),
        startedAt: new Date(),
        executedById: dto.executedById,
      },
    });
    return new ReportExecutionEntity(item);
  }

  async complete(id: string, rowCount: number): Promise<ReportExecutionEntity> {
    await this.findOne(id);
    const item = await this.prisma.reportExecution.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        rowCount,
        completedAt: new Date(),
        error: null,
      },
    });
    return new ReportExecutionEntity(item);
  }

  async fail(id: string, error: string): Promise<ReportExecutionEntity> {
    await this.findOne(id);
    const item = await this.prisma.reportExecution.update({
      where: { id },
      data: { status: 'FAILED', error, completedAt: new Date() },
    });
    return new ReportExecutionEntity(item);
  }

  private async ensureCompanyExists(id: string): Promise<void> {
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company) throw new NotFoundException('Company not found');
  }

  private async ensureReportExists(id: string): Promise<void> {
    const report = await this.prisma.reportDefinition.findUnique({ where: { id } });
    if (!report) throw new NotFoundException('Report definition not found');
  }

  private async ensureUserExists(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
  }
}
