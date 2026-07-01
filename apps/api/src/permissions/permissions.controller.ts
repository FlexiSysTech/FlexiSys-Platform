import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Permission, Permissions } from '../common/decorators/permissions.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsService } from './permissions.service';

@ApiTags('Permissions')
@ApiBearerAuth()
@Controller('permissions')
export class PermissionsController {
  constructor(
    private readonly permissionsService: PermissionsService,
  ) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PERMISSIONS_READ)
  @ApiOperation({
    summary: 'Get all permissions',
  })
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PERMISSIONS_READ)
  @ApiOperation({
    summary: 'Get permission by id',
  })
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PERMISSIONS_CREATE)
  @ApiOperation({
    summary: 'Create permission',
  })
  create(@Body() dto: CreatePermissionDto) {
    return this.permissionsService.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PERMISSIONS_UPDATE)
  @ApiOperation({
    summary: 'Update permission',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PERMISSIONS_DELETE)
  @ApiOperation({
    summary: 'Delete permission',
  })
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(id);
  }
}
