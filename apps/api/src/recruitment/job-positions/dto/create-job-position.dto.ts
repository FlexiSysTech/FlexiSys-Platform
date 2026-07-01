import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RecruitmentStatus } from '@prisma/client';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateJobPositionDto {
  @ApiProperty()
  @IsString()
  companyId!: string;

  @ApiProperty({ example: 'HR_MANAGER' })
  @IsString()
  @MaxLength(50)
  code!: string;

  @ApiProperty({ example: 'HR Manager' })
  @IsString()
  @MaxLength(200)
  title!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({ enum: RecruitmentStatus })
  @IsOptional()
  @IsEnum(RecruitmentStatus)
  status?: RecruitmentStatus;
}
