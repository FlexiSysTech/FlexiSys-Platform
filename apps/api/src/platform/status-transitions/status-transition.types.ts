export type StatusValue = string;

export interface StatusTransitionRule<
  TStatus extends StatusValue = StatusValue,
> {
  from: TStatus | TStatus[];
  to: TStatus | TStatus[];
  reason?: string;
}

export interface StatusTransitionContext<
  TStatus extends StatusValue = StatusValue,
> {
  entity: string;
  currentStatus: TStatus;
  nextStatus: TStatus;
  rules: StatusTransitionRule<TStatus>[];
}

export interface StatusTransitionResult<
  TStatus extends StatusValue = StatusValue,
> {
  allowed: boolean;
  currentStatus: TStatus;
  nextStatus: TStatus;
  reason?: string;
}
