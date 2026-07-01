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
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentsService } from './documents.service';

@ApiTags('Documents')
@ApiBearerAuth()
@Controller('documents')
export class DocumentsController {
  constructor(private readonly service: DocumentsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('documents.read')
  @ApiOperation({ summary: 'Get all documents' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('documents.read')
  @ApiOperation({ summary: 'Get document by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('documents.create')
  @ApiOperation({ summary: 'Create document' })
  create(@Body() dto: CreateDocumentDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('documents.update')
  @ApiOperation({ summary: 'Update document' })
  update(@Param('id') id: string, @Body() dto: UpdateDocumentDto) {
    return this.service.update(id, dto);
  }

  @Post(':id/archive')
  @Roles('SUPER_ADMIN')
  @Permissions('documents.update')
  @ApiOperation({ summary: 'Archive document' })
  archive(@Param('id') id: string) {
    return this.service.archive(id);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('documents.delete')
  @ApiOperation({ summary: 'Soft delete document' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
