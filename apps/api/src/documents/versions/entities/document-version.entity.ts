import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DocumentVersionEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  documentId!: string;

  @ApiProperty()
  version!: number;

  @ApiPropertyOptional({ nullable: true })
  fileName!: string | null;

  @ApiPropertyOptional({ nullable: true })
  fileUrl!: string | null;

  @ApiPropertyOptional({ nullable: true })
  mimeType!: string | null;

  @ApiPropertyOptional({ nullable: true })
  sizeBytes!: number | null;

  @ApiPropertyOptional({ nullable: true })
  notes!: string | null;

  @ApiProperty()
  createdAt!: Date;

  constructor(partial: Partial<DocumentVersionEntity>) {
    Object.assign(this, partial);
  }
}
