import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { AssetAssignmentsService } from './asset-assignments.service';
import { CreateAssetAssignmentDto } from './dto/create-asset-assignment.dto';
import { ReturnAssetAssignmentDto } from './dto/return-asset-assignment.dto';

@ApiTags('Assets / Assignments')
@ApiBearerAuth()
@Controller('assets/assignments')
export class AssetAssignmentsController {
  constructor(private readonly service: AssetAssignmentsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('assets.read')
  @ApiOperation({ summary: 'Get all asset assignments' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('assets.read')
  @ApiOperation({ summary: 'Get asset assignment by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('assets.create')
  @ApiOperation({ summary: 'Assign asset to employee' })
  assign(@Body() dto: CreateAssetAssignmentDto) {
    return this.service.assign(dto);
  }

  @Post(':id/return')
  @Roles('SUPER_ADMIN')
  @Permissions('assets.update')
  @ApiOperation({ summary: 'Return assigned asset' })
  returnAsset(@Param('id') id: string, @Body() dto: ReturnAssetAssignmentDto) {
    return this.service.returnAsset(id, dto);
  }

  @Post(':id/lost')
  @Roles('SUPER_ADMIN')
  @Permissions('assets.update')
  @ApiOperation({ summary: 'Mark assigned asset as lost' })
  markLost(@Param('id') id: string) {
    return this.service.markLost(id);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('assets.delete')
  @ApiOperation({ summary: 'Delete asset assignment' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
