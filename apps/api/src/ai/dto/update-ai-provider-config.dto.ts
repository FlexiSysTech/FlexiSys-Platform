import { PartialType } from '@nestjs/swagger';

import { CreateAiProviderConfigDto } from './create-ai-provider-config.dto';

export class UpdateAiProviderConfigDto extends PartialType(
  CreateAiProviderConfigDto,
) {}
