import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class ReturnAssetAssignmentDto {
  @ApiPropertyOptional({ example: '2026-01-15T17:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  returnedAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  conditionIn?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
