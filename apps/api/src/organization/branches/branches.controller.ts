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
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { BranchesService } from './branches.service';

@ApiTags('Organization / Branches')
@ApiBearerAuth()
@Controller('organization/branches')
export class BranchesController {
  constructor(private readonly service: BranchesService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ORGANIZATION_READ)
  @ApiOperation({ summary: 'Get all branches' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ORGANIZATION_READ)
  @ApiOperation({ summary: 'Get branches by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ORGANIZATION_CREATE)
  @ApiOperation({ summary: 'Create branches' })
  create(@Body() dto: CreateBranchDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ORGANIZATION_UPDATE)
  @ApiOperation({ summary: 'Update branches' })
  update(@Param('id') id: string, @Body() dto: UpdateBranchDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ORGANIZATION_DELETE)
  @ApiOperation({ summary: 'Delete branches' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
