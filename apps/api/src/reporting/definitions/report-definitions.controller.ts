import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateReportCategoryDto } from './dto/create-report-category.dto';
import { CreateReportDefinitionDto } from './dto/create-report-definition.dto';
import { UpdateReportCategoryDto } from './dto/update-report-category.dto';
import { UpdateReportDefinitionDto } from './dto/update-report-definition.dto';
import { ReportDefinitionsService } from './report-definitions.service';

@ApiTags('Reporting / Definitions')
@ApiBearerAuth()
@Controller('reporting')
export class ReportDefinitionsController {
  constructor(private readonly service: ReportDefinitionsService) {}

  @Get('categories')
  @Roles('SUPER_ADMIN')
  @Permissions('reporting.read')
  @ApiOperation({ summary: 'Get report categories' })
  findCategories() {
    return this.service.findCategories();
  }

  @Post('categories')
  @Roles('SUPER_ADMIN')
  @Permissions('reporting.create')
  @ApiOperation({ summary: 'Create report category' })
  createCategory(@Body() dto: CreateReportCategoryDto) {
    return this.service.createCategory(dto);
  }

  @Patch('categories/:id')
  @Roles('SUPER_ADMIN')
  @Permissions('reporting.update')
  @ApiOperation({ summary: 'Update report category' })
  updateCategory(@Param('id') id: string, @Body() dto: UpdateReportCategoryDto) {
    return this.service.updateCategory(id, dto);
  }

  @Get('definitions')
  @Roles('SUPER_ADMIN')
  @Permissions('reporting.read')
  @ApiOperation({ summary: 'Get report definitions' })
  findDefinitions() {
    return this.service.findDefinitions();
  }

  @Get('definitions/:id')
  @Roles('SUPER_ADMIN')
  @Permissions('reporting.read')
  @ApiOperation({ summary: 'Get report definition by id' })
  findDefinition(@Param('id') id: string) {
    return this.service.findDefinition(id);
  }

  @Post('definitions')
  @Roles('SUPER_ADMIN')
  @Permissions('reporting.create')
  @ApiOperation({ summary: 'Create report definition' })
  createDefinition(@Body() dto: CreateReportDefinitionDto) {
    return this.service.createDefinition(dto);
  }

  @Patch('definitions/:id')
  @Roles('SUPER_ADMIN')
  @Permissions('reporting.update')
  @ApiOperation({ summary: 'Update report definition' })
  updateDefinition(@Param('id') id: string, @Body() dto: UpdateReportDefinitionDto) {
    return this.service.updateDefinition(id, dto);
  }
}
