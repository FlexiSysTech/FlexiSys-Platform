import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreatePerformanceGoalDto } from './dto/create-performance-goal.dto';
import { UpdatePerformanceGoalDto } from './dto/update-performance-goal.dto';
import { PerformanceGoalsService } from './performance-goals.service';

@ApiTags('Performance / Goals')
@ApiBearerAuth()
@Controller('performance/goals')
export class PerformanceGoalsController {
  constructor(private readonly service: PerformanceGoalsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('performance.read')
  @ApiOperation({ summary: 'Get all performance goals' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('performance.read')
  @ApiOperation({ summary: 'Get performance goal by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('performance.create')
  @ApiOperation({ summary: 'Create performance goal' })
  create(@Body() dto: CreatePerformanceGoalDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('performance.update')
  @ApiOperation({ summary: 'Update performance goal' })
  update(@Param('id') id: string, @Body() dto: UpdatePerformanceGoalDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('performance.delete')
  @ApiOperation({ summary: 'Delete performance goal' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
