import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../common/decorators/permissions.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import {
  WorkflowAiRequestDto,
  WorkflowRuleSuggestionDto,
} from './dto/workflow-ai.dto';
import { WorkflowAiService } from './workflow-ai.service';

@ApiTags('AI / Workflow')
@ApiBearerAuth()
@Controller('ai/workflow')
export class WorkflowAiController {
  constructor(private readonly service: WorkflowAiService) {}

  @Post('approval-recommendation')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_EXECUTE)
  @ApiOperation({ summary: 'Generate workflow approval recommendation' })
  recommendApproval(@Body() dto: WorkflowAiRequestDto) {
    return this.service.recommendApproval(dto);
  }

  @Post('risk-score')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_EXECUTE)
  @ApiOperation({ summary: 'Score workflow approval risk' })
  scoreRisk(@Body() dto: WorkflowAiRequestDto) {
    return this.service.scoreRisk(dto);
  }

  @Post('rule-suggestions')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_EXECUTE)
  @ApiOperation({ summary: 'Suggest workflow business rules' })
  suggestRules(@Body() dto: WorkflowRuleSuggestionDto) {
    return this.service.suggestRules(dto);
  }
}
