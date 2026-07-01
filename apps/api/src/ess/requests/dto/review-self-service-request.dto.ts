import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SelfServiceRequestStatus } from '@prisma/client';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class ReviewSelfServiceRequestDto {
  @ApiProperty({ enum: SelfServiceRequestStatus })
  @IsEnum(SelfServiceRequestStatus)
  status!: SelfServiceRequestStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  response?: string;
}
