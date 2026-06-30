import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import {
  EmployeeStatus,
  EmploymentType,
  Gender,
} from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeEntity } from './entities/employee.entity';

type EmployeeRecord = {
  id: string;
  employeeNumber: string;
  userId: string | null;
  companyId: string;
  branchId: string | null;
  departmentId: string | null;
  positionId: string | null;
  costCenterId: string | null;
  firstName: string;
  middleName: string | null;
  lastName: string;
  fullName: string;
  nationalId: string | null;
  passportNumber: string | null;
  gender: Gender | null;
  dateOfBirth: Date | null;
  nationality: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  hireDate: Date;
  probationEndDate: Date | null;
  terminationDate: Date | null;
  employmentType: EmploymentType;
  status: EmployeeStatus;
  basicSalary: Decimal | null;
  housingAllowance: Decimal | null;
  transportAllowance: Decimal | null;
  otherAllowance: Decimal | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(employee: EmployeeRecord): EmployeeEntity {
    return new EmployeeEntity({
      id: employee.id,
      employeeNumber: employee.employeeNumber,
      userId: employee.userId,
      companyId: employee.companyId,
      branchId: employee.branchId,
      departmentId: employee.departmentId,
      positionId: employee.positionId,
      costCenterId: employee.costCenterId,
      firstName: employee.firstName,
      middleName: employee.middleName,
      lastName: employee.lastName,
      fullName: employee.fullName,
      nationalId: employee.nationalId,
      passportNumber: employee.passportNumber,
      gender: employee.gender,
      dateOfBirth: employee.dateOfBirth,
      nationality: employee.nationality,
      phone: employee.phone,
      email: employee.email,
      address: employee.address,
      hireDate: employee.hireDate,
      probationEndDate: employee.probationEndDate,
      terminationDate: employee.terminationDate,
      employmentType: employee.employmentType,
      status: employee.status,
      basicSalary: this.decimalToNumber(employee.basicSalary),
      housingAllowance: this.decimalToNumber(employee.housingAllowance),
      transportAllowance: this.decimalToNumber(employee.transportAllowance),
      otherAllowance: this.decimalToNumber(employee.otherAllowance),
      notes: employee.notes,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
    });
  }

  async findAll(): Promise<EmployeeEntity[]> {
    const employees = await this.prisma.employee.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return employees.map((employee) => this.toEntity(employee));
  }

  async findOne(id: string): Promise<EmployeeEntity> {
    const employee = await this.prisma.employee.findUnique({
      where: {
        id,
      },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return this.toEntity(employee);
  }

  async create(dto: CreateEmployeeDto): Promise<EmployeeEntity> {
    await this.ensureCompanyExists(dto.companyId);
    await this.ensureOptionalRelationsExist(dto);

    await this.ensureEmployeeNumberIsUnique(
      dto.companyId,
      dto.employeeNumber,
    );

    if (dto.userId) {
      await this.ensureUserExists(dto.userId);
      await this.ensureUserIsNotLinked(dto.userId);
    }

    const employee = await this.prisma.employee.create({
      data: {
        employeeNumber: dto.employeeNumber,
        userId: dto.userId,
        companyId: dto.companyId,
        branchId: dto.branchId,
        departmentId: dto.departmentId,
        positionId: dto.positionId,
        costCenterId: dto.costCenterId,
        firstName: dto.firstName,
        middleName: dto.middleName,
        lastName: dto.lastName,
        fullName: this.buildFullName(
          dto.firstName,
          dto.middleName,
          dto.lastName,
        ),
        nationalId: dto.nationalId,
        passportNumber: dto.passportNumber,
        gender: dto.gender,
        dateOfBirth: dto.dateOfBirth
          ? new Date(dto.dateOfBirth)
          : undefined,
        nationality: dto.nationality,
        phone: dto.phone,
        email: dto.email,
        address: dto.address,
        hireDate: new Date(dto.hireDate),
        probationEndDate: dto.probationEndDate
          ? new Date(dto.probationEndDate)
          : undefined,
        terminationDate: dto.terminationDate
          ? new Date(dto.terminationDate)
          : undefined,
        employmentType: dto.employmentType ?? EmploymentType.FULL_TIME,
        status: dto.status ?? EmployeeStatus.ACTIVE,
        basicSalary: dto.basicSalary,
        housingAllowance: dto.housingAllowance,
        transportAllowance: dto.transportAllowance,
        otherAllowance: dto.otherAllowance,
        notes: dto.notes,
      },
    });

    return this.toEntity(employee);
  }

  async update(
    id: string,
    dto: UpdateEmployeeDto,
  ): Promise<EmployeeEntity> {
    const current = await this.findOne(id);

    const companyId = dto.companyId ?? current.companyId;
    const employeeNumber =
      dto.employeeNumber ?? current.employeeNumber;

    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    await this.ensureOptionalRelationsExist(dto);

    if (dto.companyId || dto.employeeNumber) {
      await this.ensureEmployeeNumberIsUnique(
        companyId,
        employeeNumber,
        id,
      );
    }

    if (dto.userId) {
      await this.ensureUserExists(dto.userId);
      await this.ensureUserIsNotLinked(dto.userId, id);
    }

    const firstName = dto.firstName ?? current.firstName;
    const middleName =
      dto.middleName === undefined
        ? current.middleName
        : dto.middleName;
    const lastName = dto.lastName ?? current.lastName;

    const employee = await this.prisma.employee.update({
      where: {
        id,
      },
      data: {
        employeeNumber: dto.employeeNumber,
        userId: dto.userId,
        companyId: dto.companyId,
        branchId: dto.branchId,
        departmentId: dto.departmentId,
        positionId: dto.positionId,
        costCenterId: dto.costCenterId,
        firstName: dto.firstName,
        middleName: dto.middleName,
        lastName: dto.lastName,
        fullName: this.buildFullName(firstName, middleName, lastName),
        nationalId: dto.nationalId,
        passportNumber: dto.passportNumber,
        gender: dto.gender,
        dateOfBirth: dto.dateOfBirth
          ? new Date(dto.dateOfBirth)
          : undefined,
        nationality: dto.nationality,
        phone: dto.phone,
        email: dto.email,
        address: dto.address,
        hireDate: dto.hireDate ? new Date(dto.hireDate) : undefined,
        probationEndDate: dto.probationEndDate
          ? new Date(dto.probationEndDate)
          : undefined,
        terminationDate: dto.terminationDate
          ? new Date(dto.terminationDate)
          : undefined,
        employmentType: dto.employmentType,
        status: dto.status,
        basicSalary: dto.basicSalary,
        housingAllowance: dto.housingAllowance,
        transportAllowance: dto.transportAllowance,
        otherAllowance: dto.otherAllowance,
        notes: dto.notes,
      },
    });

    return this.toEntity(employee);
  }

  async remove(id: string): Promise<{
    success: boolean;
    deletedEmployee: EmployeeEntity;
  }> {
    const employee = await this.findOne(id);

    await this.prisma.employee.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      deletedEmployee: employee,
    };
  }

  private buildFullName(
    firstName: string,
    middleName: string | null | undefined,
    lastName: string,
  ): string {
    return [firstName, middleName, lastName]
      .filter(Boolean)
      .join(' ');
  }

  private decimalToNumber(value: Decimal | null): number | null {
    return value ? value.toNumber() : null;
  }

  private async ensureCompanyExists(id: string): Promise<void> {
    const exists = await this.prisma.company.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!exists) {
      throw new NotFoundException('Company not found');
    }
  }

  private async ensureOptionalRelationsExist(
    dto: CreateEmployeeDto | UpdateEmployeeDto,
  ): Promise<void> {
    if (dto.branchId) {
      const branch = await this.prisma.branch.findUnique({
        where: { id: dto.branchId },
        select: { id: true },
      });

      if (!branch) {
        throw new NotFoundException('Branch not found');
      }
    }

    if (dto.departmentId) {
      const department = await this.prisma.department.findUnique({
        where: { id: dto.departmentId },
        select: { id: true },
      });

      if (!department) {
        throw new NotFoundException('Department not found');
      }
    }

    if (dto.positionId) {
      const position = await this.prisma.position.findUnique({
        where: { id: dto.positionId },
        select: { id: true },
      });

      if (!position) {
        throw new NotFoundException('Position not found');
      }
    }

    if (dto.costCenterId) {
      const costCenter = await this.prisma.costCenter.findUnique({
        where: { id: dto.costCenterId },
        select: { id: true },
      });

      if (!costCenter) {
        throw new NotFoundException('Cost center not found');
      }
    }
  }

  private async ensureEmployeeNumberIsUnique(
    companyId: string,
    employeeNumber: string,
    excludeId?: string,
  ): Promise<void> {
    const employee = await this.prisma.employee.findFirst({
      where: {
        companyId,
        employeeNumber,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (employee) {
      throw new ConflictException(
        'Employee number already exists in this company',
      );
    }
  }

  private async ensureUserExists(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  private async ensureUserIsNotLinked(
    userId: string,
    excludeEmployeeId?: string,
  ): Promise<void> {
    const employee = await this.prisma.employee.findFirst({
      where: {
        userId,
        ...(excludeEmployeeId
          ? { id: { not: excludeEmployeeId } }
          : {}),
      },
    });

    if (employee) {
      throw new ConflictException(
        'User is already linked to another employee',
      );
    }
  }
}
