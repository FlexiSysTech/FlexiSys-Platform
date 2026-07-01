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
import { AssetCategoriesService } from './asset-categories.service';
import { CreateAssetCategoryDto } from './dto/create-asset-category.dto';
import { UpdateAssetCategoryDto } from './dto/update-asset-category.dto';

@ApiTags('Assets / Categories')
@ApiBearerAuth()
@Controller('assets/categories')
export class AssetCategoriesController {
  constructor(private readonly service: AssetCategoriesService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('assets.read')
  @ApiOperation({ summary: 'Get all asset categories' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('assets.read')
  @ApiOperation({ summary: 'Get asset category by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('assets.create')
  @ApiOperation({ summary: 'Create asset category' })
  create(@Body() dto: CreateAssetCategoryDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('assets.update')
  @ApiOperation({ summary: 'Update asset category' })
  update(@Param('id') id: string, @Body() dto: UpdateAssetCategoryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('assets.delete')
  @ApiOperation({ summary: 'Delete asset category' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
