import { Injectable } from '@nestjs/common';
import { IntegrationProviderType } from '@prisma/client';

import {
  IntegrationConnectionTestInput,
  IntegrationConnectionTestResult,
  IntegrationProviderAdapter,
} from './integration-provider.interface';

@Injectable()
export class RestIntegrationProvider implements IntegrationProviderAdapter {
  readonly type = IntegrationProviderType.REST;

  async testConnection(
    input: IntegrationConnectionTestInput,
  ): Promise<IntegrationConnectionTestResult> {
    if (!input.baseUrl) {
      return { success: false, message: 'Provider base URL is required' };
    }

    return {
      success: true,
      message: 'REST provider configuration is ready for outbound execution',
    };
  }
}
