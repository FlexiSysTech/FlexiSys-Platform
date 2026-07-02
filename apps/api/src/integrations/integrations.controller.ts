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
  CreateIntegrationConnectionDto,
  CreateIntegrationCredentialDto,
  CreateIntegrationProviderDto,
  IntegrationQueryDto,
  UpdateIntegrationConnectionDto,
  UpdateIntegrationCredentialDto,
  UpdateIntegrationProviderDto,
} from './dto/integration-core.dto';
import { IntegrationsService } from './integrations.service';

@ApiTags('Integrations')
@ApiBearerAuth()
@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly service: IntegrationsService) {}

  @Get('providers')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_READ)
  @ApiOperation({ summary: 'Get integration providers' })
  findProviders(@Query() query: IntegrationQueryDto) {
    return this.service.findProviders(query);
  }

  @Post('providers')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_CREATE)
  @ApiOperation({ summary: 'Create integration provider' })
  createProvider(@Body() dto: CreateIntegrationProviderDto) {
    return this.service.createProvider(dto);
  }

  @Patch('providers/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Update integration provider' })
  updateProvider(
    @Param('id') id: string,
    @Body() dto: UpdateIntegrationProviderDto,
  ) {
    return this.service.updateProvider(id, dto);
  }

  @Delete('providers/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_DELETE)
  @ApiOperation({ summary: 'Soft delete integration provider' })
  removeProvider(@Param('id') id: string) {
    return this.service.removeProvider(id);
  }

  @Post('providers/:id/restore')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Restore integration provider' })
  restoreProvider(@Param('id') id: string) {
    return this.service.restoreProvider(id);
  }

  @Get('credentials')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_READ)
  @ApiOperation({ summary: 'Get integration credentials' })
  findCredentials(@Query() query: IntegrationQueryDto) {
    return this.service.findCredentials(query);
  }

  @Post('credentials')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_CREATE)
  @ApiOperation({ summary: 'Create integration credential' })
  createCredential(@Body() dto: CreateIntegrationCredentialDto) {
    return this.service.createCredential(dto);
  }

  @Patch('credentials/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Update integration credential' })
  updateCredential(
    @Param('id') id: string,
    @Body() dto: UpdateIntegrationCredentialDto,
  ) {
    return this.service.updateCredential(id, dto);
  }

  @Delete('credentials/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_DELETE)
  @ApiOperation({ summary: 'Soft delete integration credential' })
  removeCredential(@Param('id') id: string) {
    return this.service.removeCredential(id);
  }

  @Get('connections')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_READ)
  @ApiOperation({ summary: 'Get integration connections' })
  findConnections(@Query() query: IntegrationQueryDto) {
    return this.service.findConnections(query);
  }

  @Post('connections')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_CREATE)
  @ApiOperation({ summary: 'Create integration connection' })
  createConnection(@Body() dto: CreateIntegrationConnectionDto) {
    return this.service.createConnection(dto);
  }

  @Patch('connections/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Update integration connection' })
  updateConnection(
    @Param('id') id: string,
    @Body() dto: UpdateIntegrationConnectionDto,
  ) {
    return this.service.updateConnection(id, dto);
  }

  @Delete('connections/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_DELETE)
  @ApiOperation({ summary: 'Soft delete integration connection' })
  removeConnection(@Param('id') id: string) {
    return this.service.removeConnection(id);
  }

  @Post('connections/:id/test')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_EXECUTE)
  @ApiOperation({ summary: 'Test integration connection' })
  testConnection(@Param('id') id: string) {
    return this.service.testConnection(id);
  }

  @Post('connections/:id/connect')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_EXECUTE)
  @ApiOperation({ summary: 'Connect integration connection' })
  connect(@Param('id') id: string) {
    return this.service.connect(id);
  }

  @Post('connections/:id/disconnect')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_EXECUTE)
  @ApiOperation({ summary: 'Disconnect integration connection' })
  disconnect(@Param('id') id: string) {
    return this.service.disconnect(id);
  }
}
