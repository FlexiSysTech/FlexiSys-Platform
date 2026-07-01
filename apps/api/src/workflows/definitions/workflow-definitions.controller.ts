import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateWorkflowDefinitionDto } from './dto/create-workflow-definition.dto';
import { CreateWorkflowStepDto } from './dto/create-workflow-step.dto';
import { UpdateWorkflowDefinitionDto } from './dto/update-workflow-definition.dto';
import { UpdateWorkflowStepDto } from './dto/update-workflow-step.dto';
import { WorkflowDefinitionsService } from './workflow-definitions.service';

@ApiTags('Workflow Definitions')
@ApiBearerAuth()
@Controller('workflows/definitions')
export class WorkflowDefinitionsController {
  constructor(private readonly service: WorkflowDefinitionsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.WORKFLOWS_READ)
  @ApiOperation({ summary: 'Get all workflow definitions' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.WORKFLOWS_READ)
  @ApiOperation({ summary: 'Get workflow definition by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.WORKFLOWS_CREATE)
  @ApiOperation({ summary: 'Create workflow definition' })
  create(@Body() dto: CreateWorkflowDefinitionDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.WORKFLOWS_UPDATE)
  @ApiOperation({ summary: 'Update workflow definition' })
  update(@Param('id') id: string, @Body() dto: UpdateWorkflowDefinitionDto) {
    return this.service.update(id, dto);
  }

  @Post(':id/activate')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.WORKFLOWS_UPDATE)
  @ApiOperation({ summary: 'Activate workflow definition' })
  activate(@Param('id') id: string) {
    return this.service.activate(id);
  }

  @Post(':id/archive')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.WORKFLOWS_UPDATE)
  @ApiOperation({ summary: 'Archive workflow definition' })
  archive(@Param('id') id: string) {
    return this.service.archive(id);
  }

  @Post(':id/steps')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.WORKFLOWS_UPDATE)
  @ApiOperation({ summary: 'Add workflow definition step' })
  addStep(@Param('id') id: string, @Body() dto: CreateWorkflowStepDto) {
    return this.service.addStep(id, dto);
  }

  @Patch(':id/steps/:stepId')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.WORKFLOWS_UPDATE)
  @ApiOperation({ summary: 'Update workflow definition step' })
  updateStep(
    @Param('id') id: string,
    @Param('stepId') stepId: string,
    @Body() dto: UpdateWorkflowStepDto,
  ) {
    return this.service.updateStep(id, stepId, dto);
  }

  @Delete(':id/steps/:stepId')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.WORKFLOWS_UPDATE)
  @ApiOperation({ summary: 'Remove workflow definition step' })
  removeStep(@Param('id') id: string, @Param('stepId') stepId: string) {
    return this.service.removeStep(id, stepId);
  }
}
