import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    example: 'users',
    description: 'Module name',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  module!: string;

  @ApiProperty({
    example: 'create',
    description: 'Action name',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  action!: string;

  @ApiProperty({
    example: 'users.create',
    description: 'Unique permission code',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  code!: string;

  @ApiPropertyOptional({
    example: 'Allows creating users',
  })
  @IsString()
  @MaxLength(255)
  description?: string;
}