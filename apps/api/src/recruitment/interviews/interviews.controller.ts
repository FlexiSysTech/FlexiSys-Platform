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
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { InterviewsService } from './interviews.service';

@ApiTags('Recruitment / Interviews')
@ApiBearerAuth()
@Controller('recruitment/interviews')
export class InterviewsController {
  constructor(private readonly service: InterviewsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('recruitment.read')
  @ApiOperation({ summary: 'Get all interviews' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('recruitment.read')
  @ApiOperation({ summary: 'Get interview by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('recruitment.create')
  @ApiOperation({ summary: 'Create interview' })
  create(@Body() dto: CreateInterviewDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('recruitment.update')
  @ApiOperation({ summary: 'Update interview' })
  update(@Param('id') id: string, @Body() dto: UpdateInterviewDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('recruitment.delete')
  @ApiOperation({ summary: 'Delete interview' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
