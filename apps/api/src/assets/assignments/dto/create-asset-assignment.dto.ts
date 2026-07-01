import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAssetAssignmentDto {
  @ApiProperty()
  @IsString()
  assetId!: string;

  @ApiProperty()
  @IsString()
  employeeId!: string;

  @ApiPropertyOptional({ example: '2026-01-01T09:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  assignedAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  conditionOut?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
