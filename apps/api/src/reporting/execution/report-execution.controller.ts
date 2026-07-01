import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateReportExecutionDto } from './dto/create-report-execution.dto';
import { ReportExecutionService } from './report-execution.service';

@ApiTags('Reporting / Execution')
@ApiBearerAuth()
@Controller('reporting/executions')
export class ReportExecutionController {
  constructor(private readonly service: ReportExecutionService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.REPORTING_READ)
  @ApiOperation({ summary: 'Get report execution history' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.REPORTING_READ)
  @ApiOperation({ summary: 'Get report execution by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.REPORTING_EXECUTE)
  @ApiOperation({ summary: 'Start report execution record' })
  start(@Body() dto: CreateReportExecutionDto) {
    return this.service.start(dto);
  }
}
