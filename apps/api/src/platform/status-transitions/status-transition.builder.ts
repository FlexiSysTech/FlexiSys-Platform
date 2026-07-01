import { StatusTransitionRule, StatusValue } from './status-transition.types';

export class StatusTransitionBuilder<TStatus extends StatusValue> {
  private readonly rules: StatusTransitionRule<TStatus>[] = [];

  allow(
    from: TStatus | TStatus[],
    to: TStatus | TStatus[],
    reason?: string,
  ): this {
    this.rules.push({ from, to, reason });

    return this;
  }

  build(): StatusTransitionRule<TStatus>[] {
    return [...this.rules];
  }
}
