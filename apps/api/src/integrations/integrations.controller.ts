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

import { Public } from '../auth/decorators/public.decorator';
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
import {
  IntegrationInboundQueryDto,
  ReceiveIntegrationWebhookDto,
} from './dto/integration-inbound.dto';
import { IntegrationMonitoringQueryDto } from './dto/integration-monitoring.dto';
import {
  CreateIntegrationRestConnectorDto,
  CreateIntegrationRetryPolicyDto,
  CreateIntegrationWebhookDto,
  EnqueueIntegrationOutboundJobDto,
  IntegrationOutboundQueryDto,
  UpdateIntegrationRestConnectorDto,
  UpdateIntegrationRetryPolicyDto,
  UpdateIntegrationWebhookDto,
} from './dto/integration-outbound.dto';
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

  @Post('providers/:id/enable')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Enable integration provider' })
  enableProvider(@Param('id') id: string) {
    return this.service.enableProvider(id);
  }

  @Post('providers/:id/disable')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Disable integration provider' })
  disableProvider(@Param('id') id: string) {
    return this.service.disableProvider(id);
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

  @Post('credentials/:id/restore')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Restore integration credential' })
  restoreCredential(@Param('id') id: string) {
    return this.service.restoreCredential(id);
  }

  @Post('credentials/:id/enable')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Enable integration credential' })
  enableCredential(@Param('id') id: string) {
    return this.service.enableCredential(id);
  }

  @Post('credentials/:id/disable')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Disable integration credential' })
  disableCredential(@Param('id') id: string) {
    return this.service.disableCredential(id);
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

  @Post('connections/:id/restore')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Restore integration connection' })
  restoreConnection(@Param('id') id: string) {
    return this.service.restoreConnection(id);
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

  @Post('connections/:id/enable')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Enable integration connection' })
  enableConnection(@Param('id') id: string) {
    return this.service.enableConnection(id);
  }

  @Post('connections/:id/disable')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Disable integration connection' })
  disableConnection(@Param('id') id: string) {
    return this.service.disableConnection(id);
  }

  @Get('retry-policies')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_READ)
  @ApiOperation({ summary: 'Get integration retry policies' })
  findRetryPolicies(@Query() query: IntegrationQueryDto) {
    return this.service.findRetryPolicies(query);
  }

  @Post('retry-policies')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_CREATE)
  @ApiOperation({ summary: 'Create integration retry policy' })
  createRetryPolicy(@Body() dto: CreateIntegrationRetryPolicyDto) {
    return this.service.createRetryPolicy(dto);
  }

  @Patch('retry-policies/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Update integration retry policy' })
  updateRetryPolicy(
    @Param('id') id: string,
    @Body() dto: UpdateIntegrationRetryPolicyDto,
  ) {
    return this.service.updateRetryPolicy(id, dto);
  }

  @Delete('retry-policies/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_DELETE)
  @ApiOperation({ summary: 'Soft delete integration retry policy' })
  removeRetryPolicy(@Param('id') id: string) {
    return this.service.removeRetryPolicy(id);
  }

  @Post('retry-policies/:id/restore')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Restore integration retry policy' })
  restoreRetryPolicy(@Param('id') id: string) {
    return this.service.restoreRetryPolicy(id);
  }

  @Post('retry-policies/:id/enable')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Enable integration retry policy' })
  enableRetryPolicy(@Param('id') id: string) {
    return this.service.enableRetryPolicy(id);
  }

  @Post('retry-policies/:id/disable')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Disable integration retry policy' })
  disableRetryPolicy(@Param('id') id: string) {
    return this.service.disableRetryPolicy(id);
  }

  @Get('webhooks')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_READ)
  @ApiOperation({ summary: 'Get outbound webhooks' })
  findWebhooks(@Query() query: IntegrationOutboundQueryDto) {
    return this.service.findWebhooks(query);
  }

  @Post('webhooks')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_CREATE)
  @ApiOperation({ summary: 'Create outbound webhook' })
  createWebhook(@Body() dto: CreateIntegrationWebhookDto) {
    return this.service.createWebhook(dto);
  }

  @Patch('webhooks/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Update outbound webhook' })
  updateWebhook(@Param('id') id: string, @Body() dto: UpdateIntegrationWebhookDto) {
    return this.service.updateWebhook(id, dto);
  }

  @Delete('webhooks/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_DELETE)
  @ApiOperation({ summary: 'Soft delete outbound webhook' })
  removeWebhook(@Param('id') id: string) {
    return this.service.removeWebhook(id);
  }

  @Post('webhooks/:id/restore')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Restore outbound webhook' })
  restoreWebhook(@Param('id') id: string) {
    return this.service.restoreWebhook(id);
  }

  @Post('webhooks/:id/enable')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Enable outbound webhook' })
  enableWebhook(@Param('id') id: string) {
    return this.service.enableWebhook(id);
  }

  @Post('webhooks/:id/disable')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Disable outbound webhook' })
  disableWebhook(@Param('id') id: string) {
    return this.service.disableWebhook(id);
  }

  @Get('rest-connectors')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_READ)
  @ApiOperation({ summary: 'Get REST connectors' })
  findRestConnectors(@Query() query: IntegrationOutboundQueryDto) {
    return this.service.findRestConnectors(query);
  }

  @Post('rest-connectors')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_CREATE)
  @ApiOperation({ summary: 'Create REST connector' })
  createRestConnector(@Body() dto: CreateIntegrationRestConnectorDto) {
    return this.service.createRestConnector(dto);
  }

  @Patch('rest-connectors/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Update REST connector' })
  updateRestConnector(
    @Param('id') id: string,
    @Body() dto: UpdateIntegrationRestConnectorDto,
  ) {
    return this.service.updateRestConnector(id, dto);
  }

  @Delete('rest-connectors/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_DELETE)
  @ApiOperation({ summary: 'Soft delete REST connector' })
  removeRestConnector(@Param('id') id: string) {
    return this.service.removeRestConnector(id);
  }

  @Post('rest-connectors/:id/restore')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Restore REST connector' })
  restoreRestConnector(@Param('id') id: string) {
    return this.service.restoreRestConnector(id);
  }

  @Post('rest-connectors/:id/enable')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Enable REST connector' })
  enableRestConnector(@Param('id') id: string) {
    return this.service.enableRestConnector(id);
  }

  @Post('rest-connectors/:id/disable')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Disable REST connector' })
  disableRestConnector(@Param('id') id: string) {
    return this.service.disableRestConnector(id);
  }

  @Get('outbound-jobs')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_MONITOR)
  @ApiOperation({ summary: 'Get outbound integration jobs' })
  findOutboundJobs(@Query() query: IntegrationOutboundQueryDto) {
    return this.service.findOutboundJobs(query);
  }

  @Post('outbound-jobs')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_EXECUTE)
  @ApiOperation({ summary: 'Queue outbound integration job' })
  enqueueOutboundJob(@Body() dto: EnqueueIntegrationOutboundJobDto) {
    return this.service.enqueueOutboundJob(dto);
  }

  @Post('outbound-jobs/process-due')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_EXECUTE)
  @ApiOperation({ summary: 'Process due outbound integration jobs' })
  processDueOutboundJobs(@Query('limit') limit?: string) {
    return this.service.processDueOutboundJobs(limit ? Number(limit) : undefined);
  }

  @Post('outbound-jobs/:id/execute')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_EXECUTE)
  @ApiOperation({ summary: 'Execute outbound integration job' })
  executeOutboundJob(@Param('id') id: string) {
    return this.service.executeOutboundJob(id);
  }

  @Post('outbound-jobs/:id/retry')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_EXECUTE)
  @ApiOperation({ summary: 'Retry failed outbound integration job' })
  retryOutboundJob(@Param('id') id: string) {
    return this.service.retryOutboundJob(id);
  }

  @Post('outbound-jobs/:id/cancel')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_UPDATE)
  @ApiOperation({ summary: 'Cancel outbound integration job' })
  cancelOutboundJob(@Param('id') id: string) {
    return this.service.cancelOutboundJob(id);
  }

  @Public()
  @Post('inbound/:connectionId/webhook')
  @ApiOperation({ summary: 'Receive inbound integration webhook' })
  receiveInboundWebhook(
    @Param('connectionId') connectionId: string,
    @Body() dto: ReceiveIntegrationWebhookDto,
  ) {
    return this.service.receiveInboundWebhook(connectionId, dto);
  }

  @Get('inbound-events')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_MONITOR)
  @ApiOperation({ summary: 'Get inbound integration events' })
  findInboundEvents(@Query() query: IntegrationInboundQueryDto) {
    return this.service.findInboundEvents(query);
  }

  @Get('executions')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_MONITOR)
  @ApiOperation({ summary: 'Get integration execution history' })
  findExecutionHistory(@Query() query: IntegrationMonitoringQueryDto) {
    return this.service.findExecutionHistory(query);
  }

  @Get('dashboard')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_MONITOR)
  @ApiOperation({ summary: 'Get integration monitoring dashboard' })
  getDashboard(@Query('companyId') companyId?: string) {
    return this.service.getDashboard(companyId);
  }

  @Get('retry-history')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_MONITOR)
  @ApiOperation({ summary: 'Get integration retry history' })
  findRetryHistory(@Query() query: IntegrationMonitoringQueryDto) {
    return this.service.findRetryHistory(query);
  }

  @Get('health')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_MONITOR)
  @ApiOperation({ summary: 'Get integration health snapshots' })
  findHealthSnapshots(@Query() query: IntegrationMonitoringQueryDto) {
    return this.service.findHealthSnapshots(query);
  }

  @Post('connections/:id/health-check')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.INTEGRATIONS_EXECUTE)
  @ApiOperation({ summary: 'Run integration connection health check' })
  checkConnectionHealth(@Param('id') id: string) {
    return this.service.checkConnectionHealth(id);
  }
}
