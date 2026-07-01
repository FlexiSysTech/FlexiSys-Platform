import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateJournalEntryDto } from './dto/create-journal-entry.dto';
import { UpdateJournalEntryDto } from './dto/update-journal-entry.dto';
import { JournalEntriesService } from './journal-entries.service';

@ApiTags('Accounting / Journal Entries')
@ApiBearerAuth()
@Controller('accounting/journal-entries')
export class JournalEntriesController {
  constructor(private readonly service: JournalEntriesService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('accounting.read')
  @ApiOperation({ summary: 'Get journal entries' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('accounting.read')
  @ApiOperation({ summary: 'Get journal entry by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('accounting.create')
  @ApiOperation({ summary: 'Create balanced journal entry' })
  create(@Body() dto: CreateJournalEntryDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('accounting.update')
  @ApiOperation({ summary: 'Update draft journal entry' })
  update(@Param('id') id: string, @Body() dto: UpdateJournalEntryDto) {
    return this.service.update(id, dto);
  }

  @Post(':id/post')
  @Roles('SUPER_ADMIN')
  @Permissions('accounting.update')
  @ApiOperation({ summary: 'Post journal entry' })
  post(@Param('id') id: string, @Query('createdById') createdById?: string) {
    return this.service.post(id, createdById);
  }

  @Post(':id/void')
  @Roles('SUPER_ADMIN')
  @Permissions('accounting.update')
  @ApiOperation({ summary: 'Void journal entry' })
  void(@Param('id') id: string, @Query('createdById') createdById?: string) {
    return this.service.void(id, createdById);
  }
}
