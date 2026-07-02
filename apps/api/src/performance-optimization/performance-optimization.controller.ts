import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../common/decorators/permissions.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import {
  BatchPlanDto,
  CacheInvalidateDto,
  CacheQueryDto,
  CacheSetDto,
  LazyLoadingPlanDto,
  QueryOptimizationQueryDto,
  RecordPerformanceMetricDto,
} from './dto/performance-optimization.dto';
import { PerformanceOptimizationService } from './performance-optimization.service';

@ApiTags('Performance Optimization')
@ApiBearerAuth()
@Controller('performance-optimization')
export class PerformanceOptimizationController {
  constructor(private readonly service: PerformanceOptimizationService) {}

  @Get('queries/recommendations')
  @Permissions(Permission.PERFORMANCE_OPTIMIZATION_READ)
  @ApiOperation({ summary: 'Get query optimization recommendations' })
  getQueryRecommendations(@Query() query: QueryOptimizationQueryDto) {
    return this.service.getQueryRecommendations(query);
  }

  @Get('cache')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PERFORMANCE_OPTIMIZATION_MANAGE)
  @ApiOperation({ summary: 'List cache entries' })
  getCacheEntries(@Query() query: CacheQueryDto) {
    return this.service.getCacheEntries(query);
  }

  @Get('cache/stats')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PERFORMANCE_OPTIMIZATION_READ)
  @ApiOperation({ summary: 'Get cache statistics' })
  getCacheStats() {
    return this.service.getCacheStats();
  }

  @Get('cache/:key')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PERFORMANCE_OPTIMIZATION_MANAGE)
  @ApiOperation({ summary: 'Read cache entry' })
  readCacheEntry(@Param('key') key: string) {
    return this.service.readCacheEntry(key);
  }

  @Post('cache')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PERFORMANCE_OPTIMIZATION_MANAGE)
  @ApiOperation({ summary: 'Set cache entry' })
  setCacheEntry(@Body() dto: CacheSetDto) {
    return this.service.setCacheEntry(dto);
  }

  @Post('cache/invalidate')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PERFORMANCE_OPTIMIZATION_MANAGE)
  @ApiOperation({ summary: 'Invalidate cache entries' })
  invalidateCache(@Body() dto: CacheInvalidateDto) {
    return this.service.invalidateCache(dto);
  }

  @Post('batch/plan')
  @Permissions(Permission.PERFORMANCE_OPTIMIZATION_EXECUTE)
  @ApiOperation({ summary: 'Create batch operation plan' })
  planBatch(@Body() dto: BatchPlanDto) {
    return this.service.planBatch(dto);
  }

  @Post('lazy-loading/plan')
  @Permissions(Permission.PERFORMANCE_OPTIMIZATION_EXECUTE)
  @ApiOperation({ summary: 'Create lazy-loading plan' })
  buildLazyLoadingPlan(@Body() dto: LazyLoadingPlanDto) {
    return this.service.buildLazyLoadingPlan(dto);
  }

  @Get('memory')
  @Permissions(Permission.PERFORMANCE_OPTIMIZATION_READ)
  @ApiOperation({ summary: 'Get memory statistics' })
  getMemoryStats() {
    return this.service.getMemoryStats();
  }

  @Get('metrics')
  @Permissions(Permission.PERFORMANCE_OPTIMIZATION_METRICS)
  @ApiOperation({ summary: 'List performance metrics' })
  getMetrics(@Query() query: QueryOptimizationQueryDto) {
    return this.service.getMetrics(query);
  }

  @Post('metrics')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PERFORMANCE_OPTIMIZATION_METRICS)
  @ApiOperation({ summary: 'Record performance metric' })
  recordMetric(@Body() dto: RecordPerformanceMetricDto) {
    return this.service.recordMetric(dto);
  }
}
