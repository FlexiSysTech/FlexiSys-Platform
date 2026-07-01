import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { AssetMaintenanceService } from './asset-maintenance.service';
import { CreateAssetMaintenanceDto } from './dto/create-asset-maintenance.dto';
import { UpdateAssetMaintenanceDto } from './dto/update-asset-maintenance.dto';

@ApiTags('Assets / Maintenance')
@ApiBearerAuth()
@Controller('assets/maintenance')
export class AssetMaintenanceController {
  constructor(private readonly service: AssetMaintenanceService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ASSETS_READ)
  @ApiOperation({ summary: 'Get all asset maintenance records' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ASSETS_READ)
  @ApiOperation({ summary: 'Get asset maintenance by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ASSETS_CREATE)
  @ApiOperation({ summary: 'Create asset maintenance record' })
  create(@Body() dto: CreateAssetMaintenanceDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ASSETS_UPDATE)
  @ApiOperation({ summary: 'Update asset maintenance record' })
  update(@Param('id') id: string, @Body() dto: UpdateAssetMaintenanceDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ASSETS_DELETE)
  @ApiOperation({ summary: 'Delete asset maintenance record' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
