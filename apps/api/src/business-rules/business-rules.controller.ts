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
import { BusinessRuleQueryDto } from './dto/business-rule-query.dto';
import { CreateBusinessRuleCategoryDto } from './dto/create-business-rule-category.dto';
import { CreateBusinessRuleDto } from './dto/create-business-rule.dto';
import { UpdateBusinessRuleCategoryDto } from './dto/update-business-rule-category.dto';
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

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BUSINESS_RULES_READ)
  @ApiOperation({ summary: 'Get business rules' })
  findRules(@Query() query: BusinessRuleQueryDto) {
    return this.service.findRules(query);
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
}
