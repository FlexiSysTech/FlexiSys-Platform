import { Module } from '@nestjs/common';

import { BranchesModule } from './branches/branches.module';
import { CompaniesModule } from './companies/companies.module';
import { CostCentersModule } from './cost-centers/cost-centers.module';
import { DepartmentsModule } from './departments/departments.module';
import { PositionsModule } from './positions/positions.module';

@Module({
  imports: [
    CompaniesModule,
    BranchesModule,
    DepartmentsModule,
    PositionsModule,
    CostCentersModule,
  ],
  exports: [
    CompaniesModule,
    BranchesModule,
    DepartmentsModule,
    PositionsModule,
    CostCentersModule,
  ],
})
export class OrganizationModule {}
