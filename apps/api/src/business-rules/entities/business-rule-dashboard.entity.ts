import { ApiProperty } from '@nestjs/swagger';

export class BusinessRuleDashboardEntity {
  constructor(partial: Partial<BusinessRuleDashboardEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  totalRules!: number;

  @ApiProperty()
  activeRules!: number;

  @ApiProperty()
  draftRules!: number;

  @ApiProperty()
  inactiveRules!: number;

  @ApiProperty()
  archivedRules!: number;

  @ApiProperty()
  executionsToday!: number;

  @ApiProperty()
  blockedExecutionsToday!: number;

  @ApiProperty()
  errorExecutionsToday!: number;
}
