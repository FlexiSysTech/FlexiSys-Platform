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
  @Permissions(Permission.DOCUMENTS_READ)
  @ApiOperation({ summary: 'Get all documents' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.DOCUMENTS_READ)
  @ApiOperation({ summary: 'Get document by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.DOCUMENTS_CREATE)
  @ApiOperation({ summary: 'Create document' })
  create(@Body() dto: CreateDocumentDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.DOCUMENTS_UPDATE)
  @ApiOperation({ summary: 'Update document' })
  update(@Param('id') id: string, @Body() dto: UpdateDocumentDto) {
    return this.service.update(id, dto);
  }

  @Post(':id/archive')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.DOCUMENTS_UPDATE)
  @ApiOperation({ summary: 'Archive document' })
  archive(@Param('id') id: string) {
    return this.service.archive(id);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.DOCUMENTS_DELETE)
  @ApiOperation({ summary: 'Soft delete document' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
