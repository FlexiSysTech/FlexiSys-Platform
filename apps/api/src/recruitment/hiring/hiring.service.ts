import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeStatus, EmploymentType, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../prisma/prisma.service';
import { HireCandidateDto } from './dto/hire-candidate.dto';
import { HireCandidateResultEntity } from './entities/hire-candidate-result.entity';

@Injectable()
export class HiringService {
  constructor(private readonly prisma: PrismaService) {}

  async hireCandidate(dto: HireCandidateDto): Promise<HireCandidateResultEntity> {
    const application = await this.prisma.jobApplication.findUnique({
      where: { id: dto.applicationId },
      include: {
        applicant: true,
        vacancy: true,
      },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (application.employeeId) {
      throw new ConflictException('Application is already linked to an employee');
    }

    if (application.status === 'HIRED') {
      throw new ConflictException('Application is already hired');
    }

    if (!application.vacancy?.companyId) {
      throw new BadRequestException('Application vacancy company is missing');
    }

    const duplicateEmployee = await this.prisma.employee.findFirst({
      where: {
        companyId: application.vacancy.companyId,
        employeeNumber: dto.employeeNumber,
      },
    });

    if (duplicateEmployee) {
      throw new ConflictException(
        'Employee number already exists in this company',
      );
    }

    let hashedPassword: string | null = null;
    const shouldCreateUser = dto.createUser ?? false;

    if (shouldCreateUser) {
      if (!dto.username || !dto.userEmail || !dto.password) {
        throw new BadRequestException(
          'username, userEmail and password are required when createUser is true',
        );
      }

      const duplicateUser = await this.prisma.user.findFirst({
        where: {
          OR: [
            { username: dto.username },
            { email: dto.userEmail },
          ],
        },
      });

      if (duplicateUser) {
        throw new ConflictException('Username or email already exists');
      }

      hashedPassword = await bcrypt.hash(dto.password, 10);
    }

    const roles = dto.roles ?? [];
    const foundRoles = roles.length
      ? await this.prisma.role.findMany({
          where: {
            code: {
              in: roles,
            },
          },
        })
      : [];

    if (foundRoles.length !== roles.length) {
      throw new NotFoundException('One or more roles were not found');
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const user = shouldCreateUser && hashedPassword
        ? await tx.user.create({
            data: {
              username: dto.username!,
              email: dto.userEmail!,
              password: hashedPassword,
              fullName: application.applicant.fullName,
              phone: application.applicant.phone,
              status: UserStatus.ACTIVE,
              passwordChangedAt: new Date(),
              roles: {
                create: foundRoles.map((role) => ({
                  role: {
                    connect: {
                      id: role.id,
                    },
                  },
                })),
              },
            },
          })
        : null;

      const employee = await tx.employee.create({
        data: {
          employeeNumber: dto.employeeNumber,
          userId: user?.id,
          companyId: application.vacancy.companyId,
          branchId: dto.branchId,
          departmentId: dto.departmentId,
          positionId: dto.positionId,
          costCenterId: dto.costCenterId,
          firstName: application.applicant.firstName,
          middleName: application.applicant.middleName,
          lastName: application.applicant.lastName,
          fullName: application.applicant.fullName,
          nationalId: application.applicant.nationalId,
          nationality: application.applicant.nationality,
          phone: application.applicant.phone,
          email: application.applicant.email,
          hireDate: new Date(dto.hireDate),
          employmentType: dto.employmentType ?? EmploymentType.FULL_TIME,
          status: EmployeeStatus.ACTIVE,
          basicSalary: dto.basicSalary,
          housingAllowance: dto.housingAllowance,
          transportAllowance: dto.transportAllowance,
          otherAllowance: dto.otherAllowance,
          notes: `Hired from recruitment application ${application.id}`,
        },
      });

      const payrollProfile = (dto.createPayrollProfile ?? true)
        ? await tx.payrollProfile.create({
            data: {
              employeeId: employee.id,
              basicSalary: dto.basicSalary ?? 0,
              housingAllowance: dto.housingAllowance ?? 0,
              transportAllowance: dto.transportAllowance ?? 0,
              otherAllowance: dto.otherAllowance ?? 0,
              bankName: dto.bankName,
              bankIban: dto.bankIban,
              effectiveFrom: new Date(dto.hireDate),
            },
          })
        : null;

      await tx.jobApplication.update({
        where: { id: application.id },
        data: {
          employeeId: employee.id,
          status: 'HIRED',
          hiredAt: new Date(),
        },
      });

      await tx.applicant.update({
        where: { id: application.applicantId },
        data: {
          status: 'HIRED',
        },
      });

      await tx.auditLog.create({
        data: {
          action: 'HIRE_CANDIDATE',
          entity: 'JobApplication',
          entityId: application.id,
          payload: {
            employeeId: employee.id,
            userId: user?.id ?? null,
            payrollProfileId: payrollProfile?.id ?? null,
          },
        },
      });

      return {
        employee,
        user,
        payrollProfile,
      };
    });

    return new HireCandidateResultEntity({
      success: true,
      employeeId: result.employee.id,
      userId: result.user?.id ?? null,
      payrollProfileId: result.payrollProfile?.id ?? null,
      applicationId: application.id,
      applicantId: application.applicantId,
    });
  }
}
