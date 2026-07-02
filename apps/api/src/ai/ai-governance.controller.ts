import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../common/decorators/permissions.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { AiGovernanceService } from './ai-governance.service';
import {
  AiGovernanceQueryDto,
  CreateAiSafetyPolicyDto,
  CreateAiUsageLimitDto,
  UpdateAiSafetyPolicyDto,
  UpdateAiUsageLimitDto,
} from './dto/ai-governance.dto';

@ApiTags('AI / Governance')
@ApiBearerAuth()
@Controller('ai/governance')
export class AiGovernanceController {
  constructor(private readonly service: AiGovernanceService) {}

  @Get('limits')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_GOVERN)
  @ApiOperation({ summary: 'Get AI usage limits' })
  findLimits(@Query() query: AiGovernanceQueryDto) {
    return this.service.findLimits(query);
  }

  @Post('limits')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_GOVERN)
  @ApiOperation({ summary: 'Create AI usage limit' })
  createLimit(@Body() dto: CreateAiUsageLimitDto) {
    return this.service.createLimit(dto);
  }

  @Patch('limits/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_GOVERN)
  @ApiOperation({ summary: 'Update AI usage limit' })
  updateLimit(@Param('id') id: string, @Body() dto: UpdateAiUsageLimitDto) {
    return this.service.updateLimit(id, dto);
  }

  @Delete('limits/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_GOVERN)
  @ApiOperation({ summary: 'Soft delete AI usage limit' })
  removeLimit(@Param('id') id: string) {
    return this.service.removeLimit(id);
  }

  @Get('policies')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_GOVERN)
  @ApiOperation({ summary: 'Get AI safety policies' })
  findPolicies(@Query() query: AiGovernanceQueryDto) {
    return this.service.findPolicies(query);
  }

  @Post('policies')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_GOVERN)
  @ApiOperation({ summary: 'Create AI safety policy' })
  createPolicy(@Body() dto: CreateAiSafetyPolicyDto) {
    return this.service.createPolicy(dto);
  }

  @Patch('policies/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_GOVERN)
  @ApiOperation({ summary: 'Update AI safety policy' })
  updatePolicy(@Param('id') id: string, @Body() dto: UpdateAiSafetyPolicyDto) {
    return this.service.updatePolicy(id, dto);
  }

  @Delete('policies/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_GOVERN)
  @ApiOperation({ summary: 'Soft delete AI safety policy' })
  removePolicy(@Param('id') id: string) {
    return this.service.removePolicy(id);
  }
}
