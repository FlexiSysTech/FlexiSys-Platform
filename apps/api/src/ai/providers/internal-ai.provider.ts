import { Injectable } from '@nestjs/common';

import {
  AiCompletionRequest,
  AiCompletionResponse,
  AiProvider,
} from './ai-provider.interface';

@Injectable()
export class InternalAiProvider implements AiProvider {
  readonly code = 'internal';

  async complete(request: AiCompletionRequest): Promise<AiCompletionResponse> {
    const summary = this.summarize(request.prompt);
    const promptTokens = this.estimateTokens(
      [request.systemPrompt, request.prompt, JSON.stringify(request.context ?? {})]
        .filter(Boolean)
        .join(' '),
    );
    const completionTokens = this.estimateTokens(summary);

    return {
      text: summary,
      payload: {
        provider: this.code,
        deterministic: true,
      },
      promptTokens,
      completionTokens,
      totalTokens: promptTokens + completionTokens,
      costAmount: 0,
      currency: 'USD',
    };
  }

  private summarize(prompt: string): string {
    const clean = prompt.trim().replace(/\s+/g, ' ');
    if (!clean) {
      return 'No input was provided for analysis.';
    }

    return `AI draft response: ${clean.slice(0, 500)}`;
  }

  private estimateTokens(value: string): number {
    if (!value.trim()) return 0;
    return Math.max(1, Math.ceil(value.trim().length / 4));
  }
}
