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
  CreatePublicApiKeyDto,
  PublicApiKeyQueryDto,
  RotatePublicApiKeyDto,
} from './dto/public-api-keys.dto';
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
}
