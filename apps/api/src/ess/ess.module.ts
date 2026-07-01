import { Module } from '@nestjs/common';

import { SelfServiceRequestsModule } from './requests/self-service-requests.module';

@Module({
  imports: [SelfServiceRequestsModule],
  exports: [SelfServiceRequestsModule],
})
export class EssModule {}
