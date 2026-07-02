import { PartialType } from '@nestjs/swagger';

import { CreateBusinessRuleConditionDto } from './create-business-rule-condition.dto';

export class UpdateBusinessRuleConditionDto extends PartialType(
  CreateBusinessRuleConditionDto,
) {}
