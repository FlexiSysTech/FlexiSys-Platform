import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  PayrollItemType,
  SalaryComponentCategory,
} from '@prisma/client';

export class PayrollItemEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  payrollRunId!: string;

  @ApiProperty()
  employeeId!: string;

  @ApiPropertyOptional({ nullable: true })
  salaryComponentId!: string | null;

  @ApiProperty({ enum: PayrollItemType })
  type!: PayrollItemType;

  @ApiProperty({ enum: SalaryComponentCategory })
  category!: SalaryComponentCategory;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional({ nullable: true })
  quantity!: number | null;

  @ApiPropertyOptional({ nullable: true })
  rate!: number | null;

  @ApiProperty()
  amount!: number;

  @ApiProperty()
  taxableAmount!: number;

  @ApiProperty()
  employerCost!: number;

  @ApiPropertyOptional({ nullable: true })
  formula!: string | null;

  @ApiPropertyOptional({ nullable: true })
  source!: string | null;

  @ApiPropertyOptional({ nullable: true })
  sourceRef!: string | null;

  @ApiProperty()
  isSystemGenerated!: boolean;

  @ApiPropertyOptional({ nullable: true })
  notes!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<PayrollItemEntity>) {
    Object.assign(this, partial);
  }
}
