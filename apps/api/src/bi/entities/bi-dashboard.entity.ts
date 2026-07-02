import { ApiProperty } from '@nestjs/swagger';
import { BiDashboardStatus, BiDashboardWidgetType } from '@prisma/client';

export class BiDashboardEntity {
  constructor(partial: Partial<BiDashboardEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  audience!: string;

  @ApiProperty({ enum: BiDashboardStatus })
  status!: BiDashboardStatus;
}

export class BiDashboardWidgetEntity {
  constructor(partial: Partial<BiDashboardWidgetEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  dashboardId!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty({ enum: BiDashboardWidgetType })
  widgetType!: BiDashboardWidgetType;
}

export class BiExecutiveDashboardEntity {
  constructor(partial: Partial<BiExecutiveDashboardEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  activeEmployees!: number;

  @ApiProperty()
  monthlyPayrollCost!: number;

  @ApiProperty()
  pendingWorkflows!: number;

  @ApiProperty()
  activeDocuments!: number;

  @ApiProperty()
  kpiCount!: number;
}
