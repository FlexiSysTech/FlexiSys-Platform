import { Module } from '@nestjs/common';

import { DocumentCategoriesModule } from './categories/document-categories.module';
import { DocumentsDashboardModule } from './dashboard/documents-dashboard.module';
import { DocumentItemsModule } from './documents/documents.module';
import { DocumentExpirationModule } from './expiration/document-expiration.module';
import { DocumentVersionsModule } from './versions/document-versions.module';

@Module({
  imports: [
    DocumentCategoriesModule,
    DocumentItemsModule,
    DocumentVersionsModule,
    DocumentExpirationModule,
    DocumentsDashboardModule,
  ],
  exports: [
    DocumentCategoriesModule,
    DocumentItemsModule,
    DocumentVersionsModule,
    DocumentExpirationModule,
    DocumentsDashboardModule,
  ],
})
export class DocumentsModule {}
