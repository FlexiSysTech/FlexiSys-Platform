import { BadRequestException, Injectable } from '@nestjs/common';

import {
  StatusTransitionContext,
  StatusTransitionResult,
  StatusTransitionRule,
  StatusValue,
} from './status-transition.types';

@Injectable()
export class StatusTransitionService {
  canTransition<TStatus extends StatusValue>(
    context: StatusTransitionContext<TStatus>,
  ): StatusTransitionResult<TStatus> {
    const matchedRule = context.rules.find((rule) =>
      this.matches(rule, context.currentStatus, context.nextStatus),
    );

    return {
      allowed: Boolean(matchedRule),
      currentStatus: context.currentStatus,
      nextStatus: context.nextStatus,
      reason:
        matchedRule?.reason ??
        `${context.entity} cannot move from ${context.currentStatus} to ${context.nextStatus}`,
    };
  }

  assertTransition<TStatus extends StatusValue>(
    context: StatusTransitionContext<TStatus>,
  ): void {
    const result = this.canTransition(context);

    if (!result.allowed) {
      throw new BadRequestException(result.reason);
    }
  }

  transition<TStatus extends StatusValue>(
    context: StatusTransitionContext<TStatus>,
  ): TStatus {
    this.assertTransition(context);

    return context.nextStatus;
  }

  private matches<TStatus extends StatusValue>(
    rule: StatusTransitionRule<TStatus>,
    from: TStatus,
    to: TStatus,
  ): boolean {
    return this.includes(rule.from, from) && this.includes(rule.to, to);
  }

  private includes<TStatus extends StatusValue>(
    allowed: TStatus | TStatus[],
    status: TStatus,
  ): boolean {
    return Array.isArray(allowed) ? allowed.includes(status) : allowed === status;
  }
}
