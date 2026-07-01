import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AuditInterceptor } from './audit/audit.interceptor';
import { AuditService } from './audit/audit.service';
import { AUDIT_STORAGE } from './audit/audit-storage.token';
import { PrismaAuditStorage } from './audit/prisma-audit.storage';
import { RequestContextMiddleware } from './request-context/request-context.middleware';
import { RequestContextInterceptor } from './request-context/request-context.interceptor';
import { RequestContextService } from './request-context/request-context.service';
import { PaginationService } from './pagination/pagination.service';

@Global()
@Module({
  providers: [
    RequestContextService,
    PaginationService,
    AuditService,
    PrismaAuditStorage,
    {
      provide: AUDIT_STORAGE,
      useExisting: PrismaAuditStorage,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestContextInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
  exports: [RequestContextService, PaginationService, AuditService, AUDIT_STORAGE],
})
export class PlatformModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
