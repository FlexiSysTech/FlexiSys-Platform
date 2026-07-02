export interface AiCompletionRequest {
  prompt: string;
  systemPrompt?: string;
  context?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface AiCompletionResponse {
  text: string;
  payload?: Record<string, unknown>;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  costAmount: number;
  currency: string;
}

export interface AiProvider {
  readonly code: string;
  complete(request: AiCompletionRequest): Promise<AiCompletionResponse>;
}
