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
}
