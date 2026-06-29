import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdatePermissionDto {
  @ApiPropertyOptional({
    example: 'users',
    description: 'Module name',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  module?: string;

  @ApiPropertyOptional({
    example: 'create',
    description: 'Action name',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  action?: string;

  @ApiPropertyOptional({
    example: 'users.create',
    description: 'Unique permission code',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  code?: string;

  @ApiPropertyOptional({
    example: 'Allows creating users',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}