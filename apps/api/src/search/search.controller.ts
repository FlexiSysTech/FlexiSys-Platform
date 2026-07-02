import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../common/decorators/permissions.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import {
  DomainSearchQueryDto,
  RebuildSearchIndexDto,
  SearchAuditQueryDto,
  SearchIndexQueryDto,
  SearchQueryDto,
  UpsertSearchIndexDto,
} from './dto/search.dto';
import { SearchService } from './search.service';

@ApiTags('Enterprise Search')
@ApiBearerAuth()
@Controller('search')
export class SearchController {
  constructor(private readonly service: SearchService) {}

  @Get('global')
  @Permissions(Permission.SEARCH_GLOBAL)
  @ApiOperation({ summary: 'Run global enterprise search' })
  globalSearch(@Query() query: SearchQueryDto) {
    return this.service.globalSearch(query);
  }

  @Get('employees')
  @Permissions(Permission.SEARCH_EMPLOYEES)
  @ApiOperation({ summary: 'Search employees' })
  searchEmployees(@Query() query: DomainSearchQueryDto) {
    return this.service.searchEmployees(query);
  }

  @Get('payroll')
  @Permissions(Permission.SEARCH_PAYROLL)
  @ApiOperation({ summary: 'Search payroll records' })
  searchPayroll(@Query() query: DomainSearchQueryDto) {
    return this.service.searchPayroll(query);
  }

  @Get('documents')
  @Permissions(Permission.SEARCH_DOCUMENTS)
  @ApiOperation({ summary: 'Search documents' })
  searchDocuments(@Query() query: DomainSearchQueryDto) {
    return this.service.searchDocuments(query);
  }

  @Get('workflows')
  @Permissions(Permission.SEARCH_WORKFLOWS)
  @ApiOperation({ summary: 'Search workflows' })
  searchWorkflows(@Query() query: DomainSearchQueryDto) {
    return this.service.searchWorkflows(query);
  }

  @Get('index')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SEARCH_ADMIN)
  @ApiOperation({ summary: 'List search index records' })
  findIndexes(@Query() query: SearchIndexQueryDto) {
    return this.service.findIndexes(query);
  }

  @Post('index')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SEARCH_ADMIN)
  @ApiOperation({ summary: 'Create or update search index record' })
  upsertIndex(@Body() dto: UpsertSearchIndexDto) {
    return this.service.upsertIndex(dto);
  }

  @Post('index/rebuild')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SEARCH_ADMIN)
  @ApiOperation({ summary: 'Rebuild search index from supported domains' })
  rebuildIndex(@Body() dto: RebuildSearchIndexDto) {
    return this.service.rebuildIndex(dto);
  }

  @Get('audit')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SEARCH_ADMIN)
  @ApiOperation({ summary: 'List search audit records' })
  findAuditLogs(@Query() query: SearchAuditQueryDto) {
    return this.service.findAuditLogs(query);
  }
}
