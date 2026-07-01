import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Permission, Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { DocumentVersionsService } from './document-versions.service';
import { CreateDocumentVersionDto } from './dto/create-document-version.dto';

@ApiTags('Documents / Versions')
@ApiBearerAuth()
@Controller('documents/versions')
export class DocumentVersionsController {
  constructor(private readonly service: DocumentVersionsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.DOCUMENTS_READ)
  @ApiOperation({ summary: 'Get all document versions' })
  findAll() {
    return this.service.findAll();
  }

  @Get('document/:documentId')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.DOCUMENTS_READ)
  @ApiOperation({ summary: 'Get versions by document' })
  findByDocument(@Param('documentId') documentId: string) {
    return this.service.findByDocument(documentId);
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.DOCUMENTS_READ)
  @ApiOperation({ summary: 'Get document version by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.DOCUMENTS_CREATE)
  @ApiOperation({ summary: 'Create document version' })
  create(@Body() dto: CreateDocumentVersionDto) {
    return this.service.create(dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.DOCUMENTS_DELETE)
  @ApiOperation({ summary: 'Delete document version' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
