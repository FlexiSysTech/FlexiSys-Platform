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
import { CreateJobPositionDto } from './dto/create-job-position.dto';
import { UpdateJobPositionDto } from './dto/update-job-position.dto';
import { JobPositionsService } from './job-positions.service';

@ApiTags('Recruitment / Job Positions')
@ApiBearerAuth()
@Controller('recruitment/job-positions')
export class JobPositionsController {
  constructor(private readonly service: JobPositionsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.RECRUITMENT_READ)
  @ApiOperation({ summary: 'Get all job positions' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.RECRUITMENT_READ)
  @ApiOperation({ summary: 'Get job position by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.RECRUITMENT_CREATE)
  @ApiOperation({ summary: 'Create job position' })
  create(@Body() dto: CreateJobPositionDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.RECRUITMENT_UPDATE)
  @ApiOperation({ summary: 'Update job position' })
  update(@Param('id') id: string, @Body() dto: UpdateJobPositionDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.RECRUITMENT_DELETE)
  @ApiOperation({ summary: 'Delete job position' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
