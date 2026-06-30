import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  EmployeeStatus,
  EmploymentType,
  Gender,
} from '@prisma/client';

export class EmployeeEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  employeeNumber!: string;

  @ApiPropertyOptional({ nullable: true })
  userId!: string | null;

  @ApiProperty()
  companyId!: string;

  @ApiPropertyOptional({ nullable: true })
  branchId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  departmentId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  positionId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  costCenterId!: string | null;

  @ApiProperty()
  firstName!: string;

  @ApiPropertyOptional({ nullable: true })
  middleName!: string | null;

  @ApiProperty()
  lastName!: string;

  @ApiProperty()
  fullName!: string;

  @ApiPropertyOptional({ nullable: true })
  nationalId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  passportNumber!: string | null;

  @ApiPropertyOptional({ enum: Gender, nullable: true })
  gender!: Gender | null;

  @ApiPropertyOptional({ nullable: true })
  dateOfBirth!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  nationality!: string | null;

  @ApiPropertyOptional({ nullable: true })
  phone!: string | null;

  @ApiPropertyOptional({ nullable: true })
  email!: string | null;

  @ApiPropertyOptional({ nullable: true })
  address!: string | null;

  @ApiProperty()
  hireDate!: Date;

  @ApiPropertyOptional({ nullable: true })
  probationEndDate!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  terminationDate!: Date | null;

  @ApiProperty({ enum: EmploymentType })
  employmentType!: EmploymentType;

  @ApiProperty({ enum: EmployeeStatus })
  status!: EmployeeStatus;

  @ApiPropertyOptional({ nullable: true })
  basicSalary!: number | null;

  @ApiPropertyOptional({ nullable: true })
  housingAllowance!: number | null;

  @ApiPropertyOptional({ nullable: true })
  transportAllowance!: number | null;

  @ApiPropertyOptional({ nullable: true })
  otherAllowance!: number | null;

  @ApiPropertyOptional({ nullable: true })
  notes!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<EmployeeEntity>) {
    Object.assign(this, partial);
  }
}
