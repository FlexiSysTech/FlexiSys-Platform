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

import { Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateCostCenterDto } from './dto/create-cost-center.dto';
import { UpdateCostCenterDto } from './dto/update-cost-center.dto';
import { CostCentersService } from './cost-centers.service';

@ApiTags('Organization / Cost Centers')
@ApiBearerAuth()
@Controller('organization/cost-centers')
export class CostCentersController {
  constructor(private readonly service: CostCentersService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('organization.read')
  @ApiOperation({ summary: 'Get all cost centers' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('organization.read')
  @ApiOperation({ summary: 'Get cost centers by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('organization.create')
  @ApiOperation({ summary: 'Create cost centers' })
  create(@Body() dto: CreateCostCenterDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('organization.update')
  @ApiOperation({ summary: 'Update cost centers' })
  update(@Param('id') id: string, @Body() dto: UpdateCostCenterDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('organization.delete')
  @ApiOperation({ summary: 'Delete cost centers' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
