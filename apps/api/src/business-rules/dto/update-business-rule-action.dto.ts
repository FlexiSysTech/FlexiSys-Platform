import { PartialType } from '@nestjs/swagger';

import { CreateBusinessRuleActionDto } from './create-business-rule-action.dto';

export class UpdateBusinessRuleActionDto extends PartialType(
  CreateBusinessRuleActionDto,
) {}
