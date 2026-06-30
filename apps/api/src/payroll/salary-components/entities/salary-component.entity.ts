import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  SalaryComponentCalculationType,
  SalaryComponentType,
} from '@prisma/client';

export class SalaryComponentEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  companyId!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiProperty({ enum: SalaryComponentType })
  type!: SalaryComponentType;

  @ApiProperty({ enum: SalaryComponentCalculationType })
  calculationType!: SalaryComponentCalculationType;

  @ApiPropertyOptional({ nullable: true })
  defaultAmount!: number | null;

  @ApiPropertyOptional({ nullable: true })
  defaultPercent!: number | null;

  @ApiProperty()
  isTaxable!: boolean;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<SalaryComponentEntity>) {
    Object.assign(this, partial);
  }
}
