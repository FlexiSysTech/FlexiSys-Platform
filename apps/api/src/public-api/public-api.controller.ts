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
  CreatePublicApiApplicationDto,
  PublicApiApplicationQueryDto,
  UpdatePublicApiApplicationDto,
} from './dto/public-api-applications.dto';
import {
  CreatePublicApiKeyDto,
  PublicApiKeyQueryDto,
  RotatePublicApiKeyDto,
} from './dto/public-api-keys.dto';
import {
  CreatePublicApiRateLimitPolicyDto,
  EvaluatePublicApiRateLimitDto,
  PublicApiRateLimitQueryDto,
  UpdatePublicApiRateLimitPolicyDto,
} from './dto/public-api-rate-limits.dto';
import {
  CreatePublicApiDto,
  CreatePublicApiGroupDto,
  CreatePublicApiVersionDto,
  PublicApiRegistryQueryDto,
  UpdatePublicApiDto,
  UpdatePublicApiGroupDto,
  UpdatePublicApiVersionDto,
} from './dto/public-api-registry.dto';
import { PublicApiService } from './public-api.service';

@ApiTags('Public API Platform')
@ApiBearerAuth()
@Controller('public-api')
export class PublicApiController {
  constructor(private readonly service: PublicApiService) {}

  @Get('registry/groups')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_READ)
  @ApiOperation({ summary: 'Get public API groups' })
  findGroups(@Query() query: PublicApiRegistryQueryDto) {
    return this.service.findGroups(query);
  }

  @Post('registry/groups')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_CREATE)
  @ApiOperation({ summary: 'Create public API group' })
  createGroup(@Body() dto: CreatePublicApiGroupDto) {
    return this.service.createGroup(dto);
  }

  @Patch('registry/groups/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_UPDATE)
  @ApiOperation({ summary: 'Update public API group' })
  updateGroup(@Param('id') id: string, @Body() dto: UpdatePublicApiGroupDto) {
    return this.service.updateGroup(id, dto);
  }

  @Delete('registry/groups/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_DELETE)
  @ApiOperation({ summary: 'Soft delete public API group' })
  removeGroup(@Param('id') id: string) {
    return this.service.removeGroup(id);
  }

  @Get('registry/apis')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_READ)
  @ApiOperation({ summary: 'Get public APIs' })
  findApis(@Query() query: PublicApiRegistryQueryDto) {
    return this.service.findApis(query);
  }

  @Post('registry/apis')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_CREATE)
  @ApiOperation({ summary: 'Create public API metadata' })
  createApi(@Body() dto: CreatePublicApiDto) {
    return this.service.createApi(dto);
  }

  @Patch('registry/apis/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_UPDATE)
  @ApiOperation({ summary: 'Update public API metadata' })
  updateApi(@Param('id') id: string, @Body() dto: UpdatePublicApiDto) {
    return this.service.updateApi(id, dto);
  }

  @Delete('registry/apis/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_DELETE)
  @ApiOperation({ summary: 'Soft delete public API metadata' })
  removeApi(@Param('id') id: string) {
    return this.service.removeApi(id);
  }

  @Get('registry/versions')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_READ)
  @ApiOperation({ summary: 'Get public API versions' })
  findVersions(@Query() query: PublicApiRegistryQueryDto) {
    return this.service.findVersions(query);
  }

  @Post('registry/versions')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_CREATE)
  @ApiOperation({ summary: 'Create public API version' })
  createVersion(@Body() dto: CreatePublicApiVersionDto) {
    return this.service.createVersion(dto);
  }

  @Patch('registry/versions/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_UPDATE)
  @ApiOperation({ summary: 'Update public API version' })
  updateVersion(@Param('id') id: string, @Body() dto: UpdatePublicApiVersionDto) {
    return this.service.updateVersion(id, dto);
  }

  @Get('keys')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_KEYS)
  @ApiOperation({ summary: 'Get public API keys' })
  findKeys(@Query() query: PublicApiKeyQueryDto) {
    return this.service.findKeys(query);
  }

  @Post('keys')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_KEYS)
  @ApiOperation({ summary: 'Create public API key' })
  createKey(@Body() dto: CreatePublicApiKeyDto) {
    return this.service.createKey(dto);
  }

  @Post('keys/:id/rotate')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_KEYS)
  @ApiOperation({ summary: 'Rotate public API key' })
  rotateKey(@Param('id') id: string, @Body() dto: RotatePublicApiKeyDto) {
    return this.service.rotateKey(id, dto);
  }

  @Post('keys/:id/revoke')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_KEYS)
  @ApiOperation({ summary: 'Revoke public API key' })
  revokeKey(@Param('id') id: string) {
    return this.service.revokeKey(id);
  }

  @Get('rate-limits/policies')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_ADMIN)
  @ApiOperation({ summary: 'Get public API rate limit policies' })
  findRateLimitPolicies(@Query() query: PublicApiRateLimitQueryDto) {
    return this.service.findRateLimitPolicies(query);
  }

  @Post('rate-limits/policies')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_ADMIN)
  @ApiOperation({ summary: 'Create public API rate limit policy' })
  createRateLimitPolicy(@Body() dto: CreatePublicApiRateLimitPolicyDto) {
    return this.service.createRateLimitPolicy(dto);
  }

  @Patch('rate-limits/policies/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_ADMIN)
  @ApiOperation({ summary: 'Update public API rate limit policy' })
  updateRateLimitPolicy(
    @Param('id') id: string,
    @Body() dto: UpdatePublicApiRateLimitPolicyDto,
  ) {
    return this.service.updateRateLimitPolicy(id, dto);
  }

  @Delete('rate-limits/policies/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_ADMIN)
  @ApiOperation({ summary: 'Soft delete public API rate limit policy' })
  removeRateLimitPolicy(@Param('id') id: string) {
    return this.service.removeRateLimitPolicy(id);
  }

  @Post('rate-limits/evaluate')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_ADMIN)
  @ApiOperation({ summary: 'Evaluate and record public API rate limit usage' })
  evaluateRateLimit(@Body() dto: EvaluatePublicApiRateLimitDto) {
    return this.service.evaluateRateLimit(dto);
  }

  @Get('rate-limits/usage')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_READ)
  @ApiOperation({ summary: 'Get public API usage counters' })
  findUsageCounters(@Query() query: PublicApiRateLimitQueryDto) {
    return this.service.findUsageCounters(query);
  }

  @Get('developer/applications')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_READ)
  @ApiOperation({ summary: 'Get developer applications' })
  findApplications(@Query() query: PublicApiApplicationQueryDto) {
    return this.service.findApplications(query);
  }

  @Post('developer/applications')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_CREATE)
  @ApiOperation({ summary: 'Register developer application' })
  registerApplication(@Body() dto: CreatePublicApiApplicationDto) {
    return this.service.registerApplication(dto);
  }

  @Patch('developer/applications/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_UPDATE)
  @ApiOperation({ summary: 'Update developer application' })
  updateApplication(
    @Param('id') id: string,
    @Body() dto: UpdatePublicApiApplicationDto,
  ) {
    return this.service.updateApplication(id, dto);
  }

  @Delete('developer/applications/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_DELETE)
  @ApiOperation({ summary: 'Soft delete developer application' })
  removeApplication(@Param('id') id: string) {
    return this.service.removeApplication(id);
  }

  @Post('developer/applications/:id/keys')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_KEYS)
  @ApiOperation({ summary: 'Generate developer application key' })
  generateApplicationKey(
    @Param('id') id: string,
    @Body() dto: CreatePublicApiKeyDto,
  ) {
    return this.service.generateApplicationKey(id, dto);
  }

  @Post('developer/applications/:id/keys/:keyId/revoke')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_KEYS)
  @ApiOperation({ summary: 'Revoke developer application key' })
  revokeApplicationKey(@Param('id') id: string, @Param('keyId') keyId: string) {
    return this.service.revokeApplicationKey(id, keyId);
  }

  @Get('developer/applications/:id/usage')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PUBLIC_API_READ)
  @ApiOperation({ summary: 'Get developer application usage statistics' })
  getApplicationUsage(@Param('id') id: string) {
    return this.service.getApplicationUsage(id);
  }
}
