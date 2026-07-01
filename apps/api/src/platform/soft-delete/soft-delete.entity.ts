import { ApiPropertyOptional } from '@nestjs/swagger';

export class SoftDeleteEntity {
  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt?: Date | null;

  @ApiPropertyOptional({ nullable: true })
  deletedById?: string | null;
}
