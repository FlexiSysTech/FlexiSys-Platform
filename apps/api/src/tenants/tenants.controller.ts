import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../common/decorators/permissions.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import {
  CreateTenantDomainDto,
  CreateTenantDto,
  ResolveTenantDto,
  TenantQueryDto,
  UpdateTenantDto,
} from './dto/tenant-core.dto';
import { TenantsService } from './tenants.service';

@ApiTags('Tenants')
@ApiBearerAuth()
@Controller('tenants')
export class TenantsController {
  constructor(private readonly service: TenantsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_READ)
  @ApiOperation({ summary: 'Get tenant registry' })
  findTenants(@Query() query: TenantQueryDto) {
    return this.service.findTenants(query);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_CREATE)
  @ApiOperation({ summary: 'Create tenant' })
  createTenant(@Body() dto: CreateTenantDto) {
    return this.service.createTenant(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_UPDATE)
  @ApiOperation({ summary: 'Update tenant' })
  updateTenant(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
    return this.service.updateTenant(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_DELETE)
  @ApiOperation({ summary: 'Soft delete tenant' })
  removeTenant(@Param('id') id: string) {
    return this.service.removeTenant(id);
  }

  @Post(':id/restore')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_UPDATE)
  @ApiOperation({ summary: 'Restore tenant' })
  restoreTenant(@Param('id') id: string) {
    return this.service.restoreTenant(id);
  }

  @Get('domains')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_READ)
  @ApiOperation({ summary: 'Get tenant domains' })
  findDomains(@Query() query: TenantQueryDto) {
    return this.service.findDomains(query);
  }

  @Post('domains')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_UPDATE)
  @ApiOperation({ summary: 'Create tenant domain' })
  createDomain(@Body() dto: CreateTenantDomainDto) {
    return this.service.createDomain(dto);
  }

  @Post('resolve')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_READ)
  @ApiOperation({ summary: 'Resolve tenant from context, code, or domain' })
  resolveTenant(@Body() dto: ResolveTenantDto) {
    return this.service.resolveTenant(dto);
  }
}
