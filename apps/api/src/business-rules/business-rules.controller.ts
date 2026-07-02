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
import { BusinessRulesService } from './business-rules.service';
import { BusinessRuleExecutionQueryDto } from './dto/business-rule-execution-query.dto';
import { BusinessRuleQueryDto } from './dto/business-rule-query.dto';
import { CreateBusinessRuleActionDto } from './dto/create-business-rule-action.dto';
import { CreateBusinessRuleCategoryDto } from './dto/create-business-rule-category.dto';
import { CreateBusinessRuleConditionDto } from './dto/create-business-rule-condition.dto';
import { CreateBusinessRuleDto } from './dto/create-business-rule.dto';
import { EvaluateBusinessRulesDto } from './dto/evaluate-business-rules.dto';
import { UpdateBusinessRuleActionDto } from './dto/update-business-rule-action.dto';
import { UpdateBusinessRuleCategoryDto } from './dto/update-business-rule-category.dto';
import { UpdateBusinessRuleConditionDto } from './dto/update-business-rule-condition.dto';
import { UpdateBusinessRuleDto } from './dto/update-business-rule.dto';

@ApiTags('Business Rules')
@ApiBearerAuth()
@Controller('business-rules')
export class BusinessRulesController {
  constructor(private readonly service: BusinessRulesService) {}

  @Get('categories')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_READ)
  @ApiOperation({ summary: 'Get business rule categories' })
  findCategories(@Query() query: BusinessRuleQueryDto) {
    return this.service.findCategories(query);
  }

  @Post('categories')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_CREATE)
  @ApiOperation({ summary: 'Create business rule category' })
  createCategory(@Body() dto: CreateBusinessRuleCategoryDto) {
    return this.service.createCategory(dto);
  }

  @Patch('categories/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_UPDATE)
  @ApiOperation({ summary: 'Update business rule category' })
  updateCategory(
    @Param('id') id: string,
    @Body() dto: UpdateBusinessRuleCategoryDto,
  ) {
    return this.service.updateCategory(id, dto);
  }

  @Delete('categories/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_DELETE)
  @ApiOperation({ summary: 'Soft delete business rule category' })
  removeCategory(@Param('id') id: string) {
    return this.service.removeCategory(id);
  }

  @Post('categories/:id/restore')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_UPDATE)
  @ApiOperation({ summary: 'Restore business rule category' })
  restoreCategory(@Param('id') id: string) {
    return this.service.restoreCategory(id);
  }

  @Get('executions')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_READ)
  @ApiOperation({ summary: 'Get business rule execution history' })
  findExecutions(@Query() query: BusinessRuleExecutionQueryDto) {
    return this.service.findExecutions(query);
  }

  @Get('dashboard')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_READ)
  @ApiOperation({ summary: 'Get business rules dashboard' })
  getDashboard(@Query('companyId') companyId?: string) {
    return this.service.getDashboard(companyId);
  }

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_READ)
  @ApiOperation({ summary: 'Get business rules' })
  findRules(@Query() query: BusinessRuleQueryDto) {
    return this.service.findRules(query);
  }

  @Post('evaluate')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_EXECUTE)
  @ApiOperation({ summary: 'Evaluate active business rules' })
  evaluate(@Body() dto: EvaluateBusinessRulesDto) {
    return this.service.evaluate(dto);
  }

  @Get(':id/conditions')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_READ)
  @ApiOperation({ summary: 'Get business rule conditions' })
  findConditions(@Param('id') id: string, @Query() query: BusinessRuleQueryDto) {
    return this.service.findConditions(id, query);
  }

  @Post(':id/conditions')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_UPDATE)
  @ApiOperation({ summary: 'Create business rule condition' })
  createCondition(
    @Param('id') id: string,
    @Body() dto: CreateBusinessRuleConditionDto,
  ) {
    return this.service.createCondition(id, dto);
  }

  @Patch(':id/conditions/:conditionId')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_UPDATE)
  @ApiOperation({ summary: 'Update business rule condition' })
  updateCondition(
    @Param('id') id: string,
    @Param('conditionId') conditionId: string,
    @Body() dto: UpdateBusinessRuleConditionDto,
  ) {
    return this.service.updateCondition(id, conditionId, dto);
  }

  @Delete(':id/conditions/:conditionId')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_DELETE)
  @ApiOperation({ summary: 'Soft delete business rule condition' })
  removeCondition(
    @Param('id') id: string,
    @Param('conditionId') conditionId: string,
  ) {
    return this.service.removeCondition(id, conditionId);
  }

  @Get(':id/actions')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_READ)
  @ApiOperation({ summary: 'Get business rule actions' })
  findActions(@Param('id') id: string, @Query() query: BusinessRuleQueryDto) {
    return this.service.findActions(id, query);
  }

  @Post(':id/actions')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_UPDATE)
  @ApiOperation({ summary: 'Create business rule action' })
  createAction(@Param('id') id: string, @Body() dto: CreateBusinessRuleActionDto) {
    return this.service.createAction(id, dto);
  }

  @Patch(':id/actions/:actionId')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_UPDATE)
  @ApiOperation({ summary: 'Update business rule action' })
  updateAction(
    @Param('id') id: string,
    @Param('actionId') actionId: string,
    @Body() dto: UpdateBusinessRuleActionDto,
  ) {
    return this.service.updateAction(id, actionId, dto);
  }

  @Delete(':id/actions/:actionId')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_DELETE)
  @ApiOperation({ summary: 'Soft delete business rule action' })
  removeAction(@Param('id') id: string, @Param('actionId') actionId: string) {
    return this.service.removeAction(id, actionId);
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_READ)
  @ApiOperation({ summary: 'Get business rule by id' })
  findRule(@Param('id') id: string) {
    return this.service.findRule(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_CREATE)
  @ApiOperation({ summary: 'Create business rule' })
  createRule(@Body() dto: CreateBusinessRuleDto) {
    return this.service.createRule(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_UPDATE)
  @ApiOperation({ summary: 'Update business rule' })
  updateRule(@Param('id') id: string, @Body() dto: UpdateBusinessRuleDto) {
    return this.service.updateRule(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_DELETE)
  @ApiOperation({ summary: 'Soft delete business rule' })
  removeRule(@Param('id') id: string) {
    return this.service.removeRule(id);
  }

  @Post(':id/restore')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_UPDATE)
  @ApiOperation({ summary: 'Restore business rule' })
  restoreRule(@Param('id') id: string) {
    return this.service.restoreRule(id);
  }
}
