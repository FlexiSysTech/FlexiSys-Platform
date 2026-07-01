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

import { Permission, Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionsService } from './positions.service';

@ApiTags('Organization / Positions')
@ApiBearerAuth()
@Controller('organization/positions')
export class PositionsController {
  constructor(private readonly service: PositionsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ORGANIZATION_READ)
  @ApiOperation({ summary: 'Get all positions' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ORGANIZATION_READ)
  @ApiOperation({ summary: 'Get positions by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ORGANIZATION_CREATE)
  @ApiOperation({ summary: 'Create positions' })
  create(@Body() dto: CreatePositionDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ORGANIZATION_UPDATE)
  @ApiOperation({ summary: 'Update positions' })
  update(@Param('id') id: string, @Body() dto: UpdatePositionDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ORGANIZATION_DELETE)
  @ApiOperation({ summary: 'Delete positions' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
