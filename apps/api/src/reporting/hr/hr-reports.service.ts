import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HrReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async employeeReport() {
    const [totalEmployees, activeEmployees, byStatus, byDepartment] =
      await Promise.all([
        this.prisma.employee.count(),
        this.prisma.employee.count({ where: { status: 'ACTIVE' } }),
        this.prisma.employee.groupBy({
          by: ['status'],
          _count: { _all: true },
        }),
        this.prisma.employee.groupBy({
          by: ['departmentId'],
          _count: { _all: true },
        }),
      ]);

    const departmentNames = await this.getDepartmentNames(
      byDepartment.map((item) => item.departmentId).filter(Boolean) as string[],
    );

    return {
      totalEmployees,
      activeEmployees,
      byStatus: byStatus.map((item) => ({
        status: item.status,
        count: item._count._all,
      })),
      byDepartment: byDepartment.map((item) => ({
        departmentId: item.departmentId,
        departmentName: item.departmentId
          ? departmentNames.get(item.departmentId) ?? 'Unknown'
          : 'Unassigned',
        count: item._count._all,
      })),
    };
  }

  async attendanceReport() {
    const [totalRecords, byStatus, totals] = await Promise.all([
      this.prisma.attendanceRecord.count(),
      this.prisma.attendanceRecord.groupBy({
        by: ['status'],
        _count: { _all: true },
      }),
      this.prisma.attendanceRecord.aggregate({
        _sum: { lateMinutes: true, overtimeMinutes: true },
      }),
    ]);

    return {
      totalRecords,
      totalLateMinutes: totals._sum.lateMinutes ?? 0,
      totalOvertimeMinutes: totals._sum.overtimeMinutes ?? 0,
      byStatus: byStatus.map((item) => ({
        status: item.status,
        count: item._count._all,
      })),
    };
  }

  async leaveReport() {
    const [totalRequests, byStatus, byType, totalDays] = await Promise.all([
      this.prisma.leaveRequest.count(),
      this.prisma.leaveRequest.groupBy({
        by: ['status'],
        _count: { _all: true },
      }),
      this.prisma.leaveRequest.groupBy({
        by: ['leaveTypeId'],
        _count: { _all: true },
        _sum: { totalDays: true },
      }),
      this.prisma.leaveRequest.aggregate({ _sum: { totalDays: true } }),
    ]);
    const leaveTypeNames = await this.getLeaveTypeNames(
      byType.map((item) => item.leaveTypeId),
    );

    return {
      totalRequests,
      totalDays: totalDays._sum.totalDays?.toNumber() ?? 0,
      byStatus: byStatus.map((item) => ({
        status: item.status,
        count: item._count._all,
      })),
      byType: byType.map((item) => ({
        leaveTypeId: item.leaveTypeId,
        leaveTypeName: leaveTypeNames.get(item.leaveTypeId) ?? 'Unknown',
        count: item._count._all,
        totalDays: item._sum.totalDays?.toNumber() ?? 0,
      })),
    };
  }

  async recruitmentReport() {
    const [
      totalApplicants,
      applicantsByStatus,
      totalApplications,
      applicationsByStatus,
      openVacancies,
      totalInterviews,
    ] = await Promise.all([
      this.prisma.applicant.count(),
      this.prisma.applicant.groupBy({
        by: ['status'],
        _count: { _all: true },
      }),
      this.prisma.jobApplication.count(),
      this.prisma.jobApplication.groupBy({
        by: ['status'],
        _count: { _all: true },
      }),
      this.prisma.vacancy.count({ where: { status: 'OPEN' } }),
      this.prisma.interview.count(),
    ]);

    return {
      totalApplicants,
      totalApplications,
      openVacancies,
      totalInterviews,
      applicantsByStatus: applicantsByStatus.map((item) => ({
        status: item.status,
        count: item._count._all,
      })),
      applicationsByStatus: applicationsByStatus.map((item) => ({
        status: item.status,
        count: item._count._all,
      })),
    };
  }

  private async getDepartmentNames(ids: string[]) {
    const departments = await this.prisma.department.findMany({
      where: { id: { in: ids } },
      select: { id: true, name: true },
    });
    return new Map(departments.map((item) => [item.id, item.name]));
  }

  private async getLeaveTypeNames(ids: string[]) {
    const leaveTypes = await this.prisma.leaveType.findMany({
      where: { id: { in: ids } },
      select: { id: true, name: true },
    });
    return new Map(leaveTypes.map((item) => [item.id, item.name]));
  }
}
