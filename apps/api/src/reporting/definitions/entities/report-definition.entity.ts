import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Prisma,
  ReportDefinitionStatus,
  ReportParameterType,
} from '@prisma/client';

export class ReportParameterEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  reportId!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  label!: string;

  @ApiProperty({ enum: ReportParameterType })
  type!: ReportParameterType;

  @ApiProperty()
  isRequired!: boolean;

  @ApiPropertyOptional({ nullable: true })
  defaultValue!: string | null;

  @ApiPropertyOptional({ nullable: true })
  options!: Prisma.JsonValue | null;

  @ApiProperty()
  displayOrder!: number;
}

export class ReportDefinitionEntity {
  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  categoryId!: string | null;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiProperty()
  module!: string;

  @ApiProperty()
  handler!: string;

  @ApiProperty({ enum: ReportDefinitionStatus })
  status!: ReportDefinitionStatus;

  @ApiProperty()
  isSystem!: boolean;

  @ApiProperty({ type: [ReportParameterEntity] })
  parameters!: ReportParameterEntity[];

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<ReportDefinitionEntity>) {
    Object.assign(this, partial);
  }
}

export class ReportCategoryEntity {
  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiProperty()
  isSystem!: boolean;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<ReportCategoryEntity>) {
    Object.assign(this, partial);
  }
}
