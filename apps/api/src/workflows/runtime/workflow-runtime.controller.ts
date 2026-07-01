import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { SubmitWorkflowRequestDto } from './dto/submit-workflow-request.dto';
import { WorkflowActionDto } from './dto/workflow-action.dto';
import { WorkflowRuntimeService } from './workflow-runtime.service';

@ApiTags('Workflow Runtime')
@ApiBearerAuth()
@Controller('workflows/requests')
export class WorkflowRuntimeController {
  constructor(private readonly service: WorkflowRuntimeService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('workflows.read')
  @ApiOperation({ summary: 'Get all workflow requests' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('workflows.read')
  @ApiOperation({ summary: 'Get workflow request by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get(':id/history')
  @Roles('SUPER_ADMIN')
  @Permissions('workflows.read')
  @ApiOperation({ summary: 'Get workflow request history' })
  history(@Param('id') id: string) {
    return this.service.history(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('workflows.create')
  @ApiOperation({ summary: 'Submit workflow request' })
  submit(@Body() dto: SubmitWorkflowRequestDto) {
    return this.service.submit(dto);
  }

  @Post(':id/steps/:stepId/approve')
  @Roles('SUPER_ADMIN')
  @Permissions('workflows.update')
  @ApiOperation({ summary: 'Approve workflow step' })
  approve(
    @Param('id') id: string,
    @Param('stepId') stepId: string,
    @Body() dto: WorkflowActionDto,
  ) {
    return this.service.approve(id, stepId, dto);
  }

  @Post(':id/steps/:stepId/reject')
  @Roles('SUPER_ADMIN')
  @Permissions('workflows.update')
  @ApiOperation({ summary: 'Reject workflow step' })
  reject(
    @Param('id') id: string,
    @Param('stepId') stepId: string,
    @Body() dto: WorkflowActionDto,
  ) {
    return this.service.reject(id, stepId, dto);
  }

  @Post(':id/cancel')
  @Roles('SUPER_ADMIN')
  @Permissions('workflows.update')
  @ApiOperation({ summary: 'Cancel workflow request' })
  cancel(@Param('id') id: string) {
    return this.service.cancel(id);
  }
}
