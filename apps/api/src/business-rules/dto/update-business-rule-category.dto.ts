import { PartialType } from '@nestjs/swagger';

import { CreateBusinessRuleCategoryDto } from './create-business-rule-category.dto';

export class UpdateBusinessRuleCategoryDto extends PartialType(
  CreateBusinessRuleCategoryDto,
) {}
