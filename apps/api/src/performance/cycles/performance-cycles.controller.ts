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
import { CreatePerformanceCycleDto } from './dto/create-performance-cycle.dto';
import { UpdatePerformanceCycleDto } from './dto/update-performance-cycle.dto';
import { PerformanceCyclesService } from './performance-cycles.service';

@ApiTags('Performance / Cycles')
@ApiBearerAuth()
@Controller('performance/cycles')
export class PerformanceCyclesController {
  constructor(private readonly service: PerformanceCyclesService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('performance.read')
  @ApiOperation({ summary: 'Get all performance cycles' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('performance.read')
  @ApiOperation({ summary: 'Get performance cycle by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('performance.create')
  @ApiOperation({ summary: 'Create performance cycle' })
  create(@Body() dto: CreatePerformanceCycleDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('performance.update')
  @ApiOperation({ summary: 'Update performance cycle' })
  update(@Param('id') id: string, @Body() dto: UpdatePerformanceCycleDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('performance.delete')
  @ApiOperation({ summary: 'Delete performance cycle' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
