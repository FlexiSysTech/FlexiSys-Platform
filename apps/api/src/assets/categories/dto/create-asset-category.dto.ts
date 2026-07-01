import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAssetCategoryDto {
  @ApiProperty()
  @IsString()
  companyId!: string;

  @ApiProperty({ example: 'LAPTOPS' })
  @IsString()
  @MaxLength(50)
  code!: string;

  @ApiProperty({ example: 'Laptops' })
  @IsString()
  @MaxLength(200)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
