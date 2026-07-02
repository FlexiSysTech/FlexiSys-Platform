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
import {
  CreateTenantUsageLimitDto,
  ProvisionTenantDto,
  RecordTenantProvisioningEventDto,
  TenantAdministrationQueryDto,
  TenantLifecycleReasonDto,
  UpdateTenantUsageLimitDto,
} from './dto/tenant-administration.dto';
import {
  CreateTenantFeatureFlagDto,
  CreateTenantLocalizationDto,
  CreateTenantSettingDto,
  TenantConfigurationQueryDto,
  UpdateTenantFeatureFlagDto,
  UpdateTenantLocalizationDto,
  UpdateTenantSettingDto,
  UpsertTenantBrandingDto,
} from './dto/tenant-configuration.dto';
import {
  AssignTenantScopeDto,
  TenantIsolationQueryDto,
  ValidateTenantScopeDto,
} from './dto/tenant-isolation.dto';
import { TenantIsolationService } from './tenant-isolation.service';
import { TenantConfigurationService } from './tenant-configuration.service';
import { TenantAdministrationService } from './tenant-administration.service';
import { TenantsService } from './tenants.service';

@ApiTags('Tenants')
@ApiBearerAuth()
@Controller('tenants')
export class TenantsController {
  constructor(
    private readonly service: TenantsService,
    private readonly isolation: TenantIsolationService,
    private readonly configuration: TenantConfigurationService,
    private readonly administration: TenantAdministrationService,
  ) {}

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

  @Get('isolation/companies')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_READ)
  @ApiOperation({ summary: 'Get tenant-scoped companies' })
  findCompanyScopes(@Query() query: TenantIsolationQueryDto) {
    return this.isolation.findCompanyScopes(query);
  }

  @Post('isolation/companies/:companyId/assign')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_UPDATE)
  @ApiOperation({ summary: 'Assign company to tenant' })
  assignCompanyTenant(
    @Param('companyId') companyId: string,
    @Body() dto: AssignTenantScopeDto,
  ) {
    return this.isolation.assignCompanyTenant(companyId, dto);
  }

  @Get('isolation/branches')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_READ)
  @ApiOperation({ summary: 'Get tenant-scoped branches' })
  findBranchScopes(@Query() query: TenantIsolationQueryDto) {
    return this.isolation.findBranchScopes(query);
  }

  @Post('isolation/branches/:branchId/assign')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_UPDATE)
  @ApiOperation({ summary: 'Assign branch to tenant' })
  assignBranchTenant(
    @Param('branchId') branchId: string,
    @Body() dto: AssignTenantScopeDto,
  ) {
    return this.isolation.assignBranchTenant(branchId, dto);
  }

  @Post('isolation/validate')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_SECURITY)
  @ApiOperation({ summary: 'Validate tenant data isolation scope' })
  validateScope(@Body() dto: ValidateTenantScopeDto) {
    return this.isolation.validateScope(dto);
  }

  @Get('configuration/settings')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_READ)
  @ApiOperation({ summary: 'Get tenant settings' })
  findSettings(@Query() query: TenantConfigurationQueryDto) {
    return this.configuration.findSettings(query);
  }

  @Post('configuration/settings')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_UPDATE)
  @ApiOperation({ summary: 'Create tenant setting' })
  createSetting(@Body() dto: CreateTenantSettingDto) {
    return this.configuration.createSetting(dto);
  }

  @Patch('configuration/settings/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_UPDATE)
  @ApiOperation({ summary: 'Update tenant setting' })
  updateSetting(@Param('id') id: string, @Body() dto: UpdateTenantSettingDto) {
    return this.configuration.updateSetting(id, dto);
  }

  @Delete('configuration/settings/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_DELETE)
  @ApiOperation({ summary: 'Soft delete tenant setting' })
  removeSetting(@Param('id') id: string) {
    return this.configuration.removeSetting(id);
  }

  @Get('configuration/feature-flags')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_READ)
  @ApiOperation({ summary: 'Get tenant feature flags' })
  findFeatureFlags(@Query() query: TenantConfigurationQueryDto) {
    return this.configuration.findFeatureFlags(query);
  }

  @Post('configuration/feature-flags')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_UPDATE)
  @ApiOperation({ summary: 'Create tenant feature flag' })
  createFeatureFlag(@Body() dto: CreateTenantFeatureFlagDto) {
    return this.configuration.createFeatureFlag(dto);
  }

  @Patch('configuration/feature-flags/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_UPDATE)
  @ApiOperation({ summary: 'Update tenant feature flag' })
  updateFeatureFlag(
    @Param('id') id: string,
    @Body() dto: UpdateTenantFeatureFlagDto,
  ) {
    return this.configuration.updateFeatureFlag(id, dto);
  }

  @Delete('configuration/feature-flags/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_DELETE)
  @ApiOperation({ summary: 'Soft delete tenant feature flag' })
  removeFeatureFlag(@Param('id') id: string) {
    return this.configuration.removeFeatureFlag(id);
  }

  @Get('configuration/localizations')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_READ)
  @ApiOperation({ summary: 'Get tenant localization profiles' })
  findLocalizations(@Query() query: TenantConfigurationQueryDto) {
    return this.configuration.findLocalizations(query);
  }

  @Post('configuration/localizations')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_UPDATE)
  @ApiOperation({ summary: 'Create tenant localization profile' })
  createLocalization(@Body() dto: CreateTenantLocalizationDto) {
    return this.configuration.createLocalization(dto);
  }

  @Patch('configuration/localizations/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_UPDATE)
  @ApiOperation({ summary: 'Update tenant localization profile' })
  updateLocalization(
    @Param('id') id: string,
    @Body() dto: UpdateTenantLocalizationDto,
  ) {
    return this.configuration.updateLocalization(id, dto);
  }

  @Post('configuration/branding')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_UPDATE)
  @ApiOperation({ summary: 'Create or update tenant branding' })
  upsertBranding(@Body() dto: UpsertTenantBrandingDto) {
    return this.configuration.upsertBranding(dto);
  }

  @Post('administration/provision')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_PROVISION)
  @ApiOperation({ summary: 'Provision tenant' })
  provisionTenant(@Body() dto: ProvisionTenantDto) {
    return this.administration.provisionTenant(dto);
  }

  @Post('administration/:id/activate')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_PROVISION)
  @ApiOperation({ summary: 'Activate tenant' })
  activateTenant(@Param('id') id: string, @Body() dto: TenantLifecycleReasonDto) {
    return this.administration.activateTenant(id, dto);
  }

  @Post('administration/:id/suspend')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_PROVISION)
  @ApiOperation({ summary: 'Suspend tenant' })
  suspendTenant(@Param('id') id: string, @Body() dto: TenantLifecycleReasonDto) {
    return this.administration.suspendTenant(id, dto);
  }

  @Post('administration/:id/resume')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_PROVISION)
  @ApiOperation({ summary: 'Resume tenant' })
  resumeTenant(@Param('id') id: string, @Body() dto: TenantLifecycleReasonDto) {
    return this.administration.resumeTenant(id, dto);
  }

  @Post('administration/:id/archive')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_PROVISION)
  @ApiOperation({ summary: 'Archive tenant' })
  archiveTenant(@Param('id') id: string, @Body() dto: TenantLifecycleReasonDto) {
    return this.administration.archiveTenant(id, dto);
  }

  @Get('administration/usage-limits')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_READ)
  @ApiOperation({ summary: 'Get tenant usage limits' })
  findUsageLimits(@Query() query: TenantAdministrationQueryDto) {
    return this.administration.findUsageLimits(query);
  }

  @Post('administration/usage-limits')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_UPDATE)
  @ApiOperation({ summary: 'Create tenant usage limit' })
  createUsageLimit(@Body() dto: CreateTenantUsageLimitDto) {
    return this.administration.createUsageLimit(dto);
  }

  @Patch('administration/usage-limits/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_UPDATE)
  @ApiOperation({ summary: 'Update tenant usage limit' })
  updateUsageLimit(
    @Param('id') id: string,
    @Body() dto: UpdateTenantUsageLimitDto,
  ) {
    return this.administration.updateUsageLimit(id, dto);
  }

  @Delete('administration/usage-limits/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_DELETE)
  @ApiOperation({ summary: 'Soft delete tenant usage limit' })
  removeUsageLimit(@Param('id') id: string) {
    return this.administration.removeUsageLimit(id);
  }

  @Get('administration/events')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_READ)
  @ApiOperation({ summary: 'Get tenant provisioning events' })
  findProvisioningEvents(@Query() query: TenantAdministrationQueryDto) {
    return this.administration.findProvisioningEvents(query);
  }

  @Post('administration/events')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.TENANTS_PROVISION)
  @ApiOperation({ summary: 'Record tenant provisioning event' })
  recordProvisioningEvent(@Body() dto: RecordTenantProvisioningEventDto) {
    return this.administration.recordProvisioningEvent(dto);
  }
}
