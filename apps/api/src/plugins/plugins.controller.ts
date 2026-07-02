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
  CreatePluginManifestDto,
  LoadPluginDto,
  PluginQueryDto,
  UpdatePluginManifestDto,
} from './dto/plugin-core.dto';
import {
  CreatePluginCapabilityGrantDto,
  CreatePluginDependencyDto,
  PluginIsolationQueryDto,
  UpdatePluginDependencyDto,
  UpsertPluginSandboxPolicyDto,
} from './dto/plugin-isolation.dto';
import {
  CreatePluginMarketplacePackageDto,
  CreatePluginMarketplaceVersionDto,
  InstallPluginMarketplaceVersionDto,
  PluginMarketplaceQueryDto,
  UpdatePluginMarketplacePackageDto,
  UpdatePluginMarketplaceVersionDto,
  UpgradePluginInstallationDto,
} from './dto/plugin-marketplace.dto';
import {
  CreatePluginConfigurationDto,
  CreatePluginEventSubscriptionDto,
  CreatePluginHookDto,
  CreatePluginPermissionGrantDto,
  CreatePluginServiceBindingDto,
  EmitPluginEventDto,
  PluginSdkQueryDto,
  UpdatePluginConfigurationDto,
  UpdatePluginEventSubscriptionDto,
  UpdatePluginHookDto,
  UpdatePluginServiceBindingDto,
} from './dto/plugin-sdk.dto';
import { PluginsService } from './plugins.service';

@ApiTags('Plugins')
@ApiBearerAuth()
@Controller('plugins')
export class PluginsController {
  constructor(private readonly service: PluginsService) {}

  @Get('manifests')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_READ)
  @ApiOperation({ summary: 'Get plugin manifests' })
  findManifests(@Query() query: PluginQueryDto) {
    return this.service.findManifests(query);
  }

  @Post('manifests')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_CREATE)
  @ApiOperation({ summary: 'Create plugin manifest' })
  createManifest(@Body() dto: CreatePluginManifestDto) {
    return this.service.createManifest(dto);
  }

  @Patch('manifests/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_UPDATE)
  @ApiOperation({ summary: 'Update plugin manifest' })
  updateManifest(@Param('id') id: string, @Body() dto: UpdatePluginManifestDto) {
    return this.service.updateManifest(id, dto);
  }

  @Delete('manifests/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_DELETE)
  @ApiOperation({ summary: 'Soft delete plugin manifest' })
  removeManifest(@Param('id') id: string) {
    return this.service.removeManifest(id);
  }

  @Post('manifests/:id/restore')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_UPDATE)
  @ApiOperation({ summary: 'Restore plugin manifest' })
  restoreManifest(@Param('id') id: string) {
    return this.service.restoreManifest(id);
  }

  @Post('manifests/:id/load')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_EXECUTE)
  @ApiOperation({ summary: 'Load plugin manifest into registry' })
  loadManifest(@Param('id') id: string, @Body() dto: LoadPluginDto) {
    return this.service.loadManifest(id, dto);
  }

  @Get('registry')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_READ)
  @ApiOperation({ summary: 'Get plugin registry entries' })
  findRegistry(@Query() query: PluginQueryDto) {
    return this.service.findRegistry(query);
  }

  @Post('registry/:id/enable')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_EXECUTE)
  @ApiOperation({ summary: 'Enable loaded plugin' })
  enableRegistryEntry(@Param('id') id: string) {
    return this.service.enableRegistryEntry(id);
  }

  @Post('registry/:id/disable')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_EXECUTE)
  @ApiOperation({ summary: 'Disable loaded plugin' })
  disableRegistryEntry(@Param('id') id: string) {
    return this.service.disableRegistryEntry(id);
  }

  @Post('registry/:id/unload')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_EXECUTE)
  @ApiOperation({ summary: 'Unload plugin from registry' })
  unloadRegistryEntry(@Param('id') id: string) {
    return this.service.unloadRegistryEntry(id);
  }

  @Get('registry/:id/lifecycle-events')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_READ)
  @ApiOperation({ summary: 'Get plugin lifecycle events' })
  findLifecycleEvents(@Param('id') id: string, @Query() query: PluginQueryDto) {
    return this.service.findLifecycleEvents(id, query);
  }

  @Get('sdk/event-subscriptions')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_READ)
  @ApiOperation({ summary: 'Get plugin event subscriptions' })
  findEventSubscriptions(@Query() query: PluginSdkQueryDto) {
    return this.service.findEventSubscriptions(query);
  }

  @Post('sdk/event-subscriptions')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_UPDATE)
  @ApiOperation({ summary: 'Create plugin event subscription' })
  createEventSubscription(@Body() dto: CreatePluginEventSubscriptionDto) {
    return this.service.createEventSubscription(dto);
  }

  @Patch('sdk/event-subscriptions/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_UPDATE)
  @ApiOperation({ summary: 'Update plugin event subscription' })
  updateEventSubscription(
    @Param('id') id: string,
    @Body() dto: UpdatePluginEventSubscriptionDto,
  ) {
    return this.service.updateEventSubscription(id, dto);
  }

  @Delete('sdk/event-subscriptions/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_DELETE)
  @ApiOperation({ summary: 'Soft delete plugin event subscription' })
  removeEventSubscription(@Param('id') id: string) {
    return this.service.removeEventSubscription(id);
  }

  @Get('sdk/hooks')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_READ)
  @ApiOperation({ summary: 'Get plugin hooks' })
  findHooks(@Query() query: PluginSdkQueryDto) {
    return this.service.findHooks(query);
  }

  @Post('sdk/hooks')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_UPDATE)
  @ApiOperation({ summary: 'Create plugin hook' })
  createHook(@Body() dto: CreatePluginHookDto) {
    return this.service.createHook(dto);
  }

  @Patch('sdk/hooks/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_UPDATE)
  @ApiOperation({ summary: 'Update plugin hook' })
  updateHook(@Param('id') id: string, @Body() dto: UpdatePluginHookDto) {
    return this.service.updateHook(id, dto);
  }

  @Delete('sdk/hooks/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_DELETE)
  @ApiOperation({ summary: 'Soft delete plugin hook' })
  removeHook(@Param('id') id: string) {
    return this.service.removeHook(id);
  }

  @Get('sdk/service-bindings')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_READ)
  @ApiOperation({ summary: 'Get plugin service bindings' })
  findServiceBindings(@Query() query: PluginSdkQueryDto) {
    return this.service.findServiceBindings(query);
  }

  @Post('sdk/service-bindings')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_UPDATE)
  @ApiOperation({ summary: 'Create plugin service binding' })
  createServiceBinding(@Body() dto: CreatePluginServiceBindingDto) {
    return this.service.createServiceBinding(dto);
  }

  @Patch('sdk/service-bindings/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_UPDATE)
  @ApiOperation({ summary: 'Update plugin service binding' })
  updateServiceBinding(
    @Param('id') id: string,
    @Body() dto: UpdatePluginServiceBindingDto,
  ) {
    return this.service.updateServiceBinding(id, dto);
  }

  @Delete('sdk/service-bindings/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_DELETE)
  @ApiOperation({ summary: 'Soft delete plugin service binding' })
  removeServiceBinding(@Param('id') id: string) {
    return this.service.removeServiceBinding(id);
  }

  @Get('sdk/permission-grants')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_READ)
  @ApiOperation({ summary: 'Get plugin permission grants' })
  findPermissionGrants(@Query() query: PluginSdkQueryDto) {
    return this.service.findPermissionGrants(query);
  }

  @Post('sdk/permission-grants')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_GOVERN)
  @ApiOperation({ summary: 'Grant permission to plugin' })
  createPermissionGrant(@Body() dto: CreatePluginPermissionGrantDto) {
    return this.service.createPermissionGrant(dto);
  }

  @Delete('sdk/permission-grants/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_GOVERN)
  @ApiOperation({ summary: 'Revoke plugin permission grant' })
  revokePermissionGrant(@Param('id') id: string) {
    return this.service.revokePermissionGrant(id);
  }

  @Get('sdk/configurations')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_READ)
  @ApiOperation({ summary: 'Get plugin configurations' })
  findConfigurations(@Query() query: PluginSdkQueryDto) {
    return this.service.findConfigurations(query);
  }

  @Post('sdk/configurations')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_UPDATE)
  @ApiOperation({ summary: 'Create plugin configuration' })
  createConfiguration(@Body() dto: CreatePluginConfigurationDto) {
    return this.service.createConfiguration(dto);
  }

  @Patch('sdk/configurations/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_UPDATE)
  @ApiOperation({ summary: 'Update plugin configuration' })
  updateConfiguration(
    @Param('id') id: string,
    @Body() dto: UpdatePluginConfigurationDto,
  ) {
    return this.service.updateConfiguration(id, dto);
  }

  @Delete('sdk/configurations/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_DELETE)
  @ApiOperation({ summary: 'Soft delete plugin configuration' })
  removeConfiguration(@Param('id') id: string) {
    return this.service.removeConfiguration(id);
  }

  @Post('sdk/events')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_EXECUTE)
  @ApiOperation({ summary: 'Emit plugin SDK event' })
  emitEvent(@Body() dto: EmitPluginEventDto) {
    return this.service.emitEvent(dto);
  }

  @Get('sdk/events')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_READ)
  @ApiOperation({ summary: 'Get plugin SDK event history' })
  findEvents(@Query() query: PluginSdkQueryDto) {
    return this.service.findEvents(query);
  }

  @Get('marketplace/packages')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_READ)
  @ApiOperation({ summary: 'Get marketplace packages' })
  findMarketplacePackages(@Query() query: PluginMarketplaceQueryDto) {
    return this.service.findMarketplacePackages(query);
  }

  @Post('marketplace/packages')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_CREATE)
  @ApiOperation({ summary: 'Create marketplace package' })
  createMarketplacePackage(@Body() dto: CreatePluginMarketplacePackageDto) {
    return this.service.createMarketplacePackage(dto);
  }

  @Patch('marketplace/packages/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_UPDATE)
  @ApiOperation({ summary: 'Update marketplace package' })
  updateMarketplacePackage(
    @Param('id') id: string,
    @Body() dto: UpdatePluginMarketplacePackageDto,
  ) {
    return this.service.updateMarketplacePackage(id, dto);
  }

  @Get('marketplace/versions')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_READ)
  @ApiOperation({ summary: 'Get marketplace package versions' })
  findMarketplaceVersions(@Query() query: PluginMarketplaceQueryDto) {
    return this.service.findMarketplaceVersions(query);
  }

  @Post('marketplace/versions')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_CREATE)
  @ApiOperation({ summary: 'Create marketplace package version' })
  createMarketplaceVersion(@Body() dto: CreatePluginMarketplaceVersionDto) {
    return this.service.createMarketplaceVersion(dto);
  }

  @Patch('marketplace/versions/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_UPDATE)
  @ApiOperation({ summary: 'Update marketplace package version' })
  updateMarketplaceVersion(
    @Param('id') id: string,
    @Body() dto: UpdatePluginMarketplaceVersionDto,
  ) {
    return this.service.updateMarketplaceVersion(id, dto);
  }

  @Post('marketplace/versions/:id/install')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_EXECUTE)
  @ApiOperation({ summary: 'Install marketplace package version' })
  installMarketplaceVersion(
    @Param('id') id: string,
    @Body() dto: InstallPluginMarketplaceVersionDto,
  ) {
    return this.service.installMarketplaceVersion(id, dto);
  }

  @Get('marketplace/installations')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_READ)
  @ApiOperation({ summary: 'Get plugin installations' })
  findInstallations(@Query() query: PluginMarketplaceQueryDto) {
    return this.service.findInstallations(query);
  }

  @Post('marketplace/installations/:id/enable')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_EXECUTE)
  @ApiOperation({ summary: 'Enable plugin installation' })
  enableInstallation(@Param('id') id: string) {
    return this.service.enableInstallation(id);
  }

  @Post('marketplace/installations/:id/disable')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_EXECUTE)
  @ApiOperation({ summary: 'Disable plugin installation' })
  disableInstallation(@Param('id') id: string) {
    return this.service.disableInstallation(id);
  }

  @Post('marketplace/installations/:id/uninstall')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_DELETE)
  @ApiOperation({ summary: 'Uninstall plugin installation' })
  uninstallInstallation(@Param('id') id: string) {
    return this.service.uninstallInstallation(id);
  }

  @Post('marketplace/installations/:id/upgrade')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_EXECUTE)
  @ApiOperation({ summary: 'Upgrade plugin installation' })
  upgradeInstallation(
    @Param('id') id: string,
    @Body() dto: UpgradePluginInstallationDto,
  ) {
    return this.service.upgradeInstallation(id, dto);
  }

  @Get('isolation/sandbox-policies')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_READ)
  @ApiOperation({ summary: 'Get plugin sandbox policies' })
  findSandboxPolicies(@Query() query: PluginIsolationQueryDto) {
    return this.service.findSandboxPolicies(query);
  }

  @Post('isolation/sandbox-policies')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_GOVERN)
  @ApiOperation({ summary: 'Create or update plugin sandbox policy' })
  upsertSandboxPolicy(@Body() dto: UpsertPluginSandboxPolicyDto) {
    return this.service.upsertSandboxPolicy(dto);
  }

  @Get('isolation/dependencies')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_READ)
  @ApiOperation({ summary: 'Get plugin dependencies' })
  findDependencies(@Query() query: PluginIsolationQueryDto) {
    return this.service.findDependencies(query);
  }

  @Post('isolation/dependencies')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_UPDATE)
  @ApiOperation({ summary: 'Create plugin dependency' })
  createDependency(@Body() dto: CreatePluginDependencyDto) {
    return this.service.createDependency(dto);
  }

  @Patch('isolation/dependencies/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_UPDATE)
  @ApiOperation({ summary: 'Update plugin dependency' })
  updateDependency(
    @Param('id') id: string,
    @Body() dto: UpdatePluginDependencyDto,
  ) {
    return this.service.updateDependency(id, dto);
  }

  @Post('isolation/registry/:id/validate-dependencies')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_EXECUTE)
  @ApiOperation({ summary: 'Validate plugin dependencies' })
  validateDependencies(@Param('id') id: string) {
    return this.service.validateDependencies(id);
  }

  @Get('isolation/capability-grants')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_READ)
  @ApiOperation({ summary: 'Get plugin capability grants' })
  findCapabilityGrants(@Query() query: PluginIsolationQueryDto) {
    return this.service.findCapabilityGrants(query);
  }

  @Post('isolation/capability-grants')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_GOVERN)
  @ApiOperation({ summary: 'Grant plugin capability' })
  createCapabilityGrant(@Body() dto: CreatePluginCapabilityGrantDto) {
    return this.service.createCapabilityGrant(dto);
  }

  @Delete('isolation/capability-grants/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_GOVERN)
  @ApiOperation({ summary: 'Revoke plugin capability' })
  revokeCapabilityGrant(@Param('id') id: string) {
    return this.service.revokeCapabilityGrant(id);
  }

  @Post('isolation/registry/:id/validate')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PLUGINS_EXECUTE)
  @ApiOperation({ summary: 'Validate plugin isolation posture' })
  validateIsolation(@Param('id') id: string) {
    return this.service.validateIsolation(id);
  }
}
