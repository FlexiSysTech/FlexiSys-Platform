import { ApiProperty } from '@nestjs/swagger';

export class DocumentsDashboardEntity {
  @ApiProperty()
  totalDocuments!: number;

  @ApiProperty()
  activeDocuments!: number;

  @ApiProperty()
  expiredDocuments!: number;

  @ApiProperty()
  archivedDocuments!: number;

  @ApiProperty()
  deletedDocuments!: number;

  @ApiProperty()
  expiringIn90Days!: number;

  @ApiProperty()
  expiringIn60Days!: number;

  @ApiProperty()
  expiringIn30Days!: number;

  @ApiProperty()
  expiringIn7Days!: number;

  @ApiProperty()
  employeeDocuments!: number;

  constructor(partial: Partial<DocumentsDashboardEntity>) {
    Object.assign(this, partial);
  }
}
