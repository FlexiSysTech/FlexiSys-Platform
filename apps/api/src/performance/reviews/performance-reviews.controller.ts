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
import { CreatePerformanceReviewDto } from './dto/create-performance-review.dto';
import { UpdatePerformanceReviewDto } from './dto/update-performance-review.dto';
import { PerformanceReviewsService } from './performance-reviews.service';

@ApiTags('Performance / Reviews')
@ApiBearerAuth()
@Controller('performance/reviews')
export class PerformanceReviewsController {
  constructor(private readonly service: PerformanceReviewsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('performance.read')
  @ApiOperation({ summary: 'Get all performance reviews' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('performance.read')
  @ApiOperation({ summary: 'Get performance review by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('performance.create')
  @ApiOperation({ summary: 'Create performance review' })
  create(@Body() dto: CreatePerformanceReviewDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('performance.update')
  @ApiOperation({ summary: 'Update performance review' })
  update(@Param('id') id: string, @Body() dto: UpdatePerformanceReviewDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('performance.delete')
  @ApiOperation({ summary: 'Delete performance review' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
