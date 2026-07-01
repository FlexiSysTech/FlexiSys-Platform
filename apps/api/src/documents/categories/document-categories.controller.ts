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
import { DocumentCategoriesService } from './document-categories.service';
import { CreateDocumentCategoryDto } from './dto/create-document-category.dto';
import { UpdateDocumentCategoryDto } from './dto/update-document-category.dto';

@ApiTags('Documents / Categories')
@ApiBearerAuth()
@Controller('documents/categories')
export class DocumentCategoriesController {
  constructor(private readonly service: DocumentCategoriesService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('documents.read')
  @ApiOperation({ summary: 'Get all document categories' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('documents.read')
  @ApiOperation({ summary: 'Get document category by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('documents.create')
  @ApiOperation({ summary: 'Create document category' })
  create(@Body() dto: CreateDocumentCategoryDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('documents.update')
  @ApiOperation({ summary: 'Update document category' })
  update(@Param('id') id: string, @Body() dto: UpdateDocumentCategoryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('documents.delete')
  @ApiOperation({ summary: 'Delete document category' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
