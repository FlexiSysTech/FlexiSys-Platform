import { IntegrationProviderType } from '@prisma/client';

export interface IntegrationConnectionTestInput {
  providerCode: string;
  providerType: IntegrationProviderType;
  baseUrl?: string | null;
  config?: Record<string, unknown> | null;
  credentialRef?: string | null;
}

export interface IntegrationConnectionTestResult {
  success: boolean;
  message?: string;
}

export interface IntegrationProviderAdapter {
  readonly type: IntegrationProviderType;
  testConnection(
    input: IntegrationConnectionTestInput,
  ): Promise<IntegrationConnectionTestResult>;
}
