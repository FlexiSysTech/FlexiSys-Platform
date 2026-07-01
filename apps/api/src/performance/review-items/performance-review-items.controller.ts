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
import { CreatePerformanceReviewItemDto } from './dto/create-performance-review-item.dto';
import { UpdatePerformanceReviewItemDto } from './dto/update-performance-review-item.dto';
import { PerformanceReviewItemsService } from './performance-review-items.service';

@ApiTags('Performance / Review Items')
@ApiBearerAuth()
@Controller('performance/review-items')
export class PerformanceReviewItemsController {
  constructor(private readonly service: PerformanceReviewItemsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('performance.read')
  @ApiOperation({ summary: 'Get all performance review items' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('performance.read')
  @ApiOperation({ summary: 'Get performance review item by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('performance.create')
  @ApiOperation({ summary: 'Create performance review item' })
  create(@Body() dto: CreatePerformanceReviewItemDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('performance.update')
  @ApiOperation({ summary: 'Update performance review item' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePerformanceReviewItemDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('performance.delete')
  @ApiOperation({ summary: 'Delete performance review item' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
