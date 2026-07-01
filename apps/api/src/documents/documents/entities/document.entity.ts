import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  DocumentOwnerType,
  DocumentStatus,
  DocumentVisibility,
} from '@prisma/client';

export class DocumentEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  companyId!: string;

  @ApiPropertyOptional({ nullable: true })
  categoryId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  employeeId!: string | null;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  title!: string;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiPropertyOptional({ nullable: true })
  fileName!: string | null;

  @ApiPropertyOptional({ nullable: true })
  fileUrl!: string | null;

  @ApiPropertyOptional({ nullable: true })
  mimeType!: string | null;

  @ApiPropertyOptional({ nullable: true })
  sizeBytes!: number | null;

  @ApiProperty({ enum: DocumentOwnerType })
  ownerType!: DocumentOwnerType;

  @ApiProperty({ enum: DocumentVisibility })
  visibility!: DocumentVisibility;

  @ApiProperty({ enum: DocumentStatus })
  status!: DocumentStatus;

  @ApiPropertyOptional({ nullable: true })
  issueDate!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  expiryDate!: Date | null;

  @ApiProperty()
  version!: number;

  @ApiPropertyOptional({ nullable: true })
  tags!: string | null;

  @ApiPropertyOptional({ nullable: true })
  notes!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<DocumentEntity>) {
    Object.assign(this, partial);
  }
}
