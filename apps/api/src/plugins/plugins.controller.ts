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
}
