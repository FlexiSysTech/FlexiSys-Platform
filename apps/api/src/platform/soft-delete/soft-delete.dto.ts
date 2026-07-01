import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SoftDeleteQueryDto {
  @ApiPropertyOptional({
    description: 'Optional actor override. Prefer authenticated context.',
  })
  @IsOptional()
  @IsString()
  deletedById?: string;
}

export class RestoreQueryDto {
  @ApiPropertyOptional({
    description: 'Optional actor override. Prefer authenticated context.',
  })
  @IsOptional()
  @IsString()
  restoredById?: string;
}
