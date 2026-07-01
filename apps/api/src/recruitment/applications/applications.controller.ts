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
import { ApplicationsService } from './applications.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';

@ApiTags('Recruitment / Applications')
@ApiBearerAuth()
@Controller('recruitment/applications')
export class ApplicationsController {
  constructor(private readonly service: ApplicationsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.RECRUITMENT_READ)
  @ApiOperation({ summary: 'Get all applications' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.RECRUITMENT_READ)
  @ApiOperation({ summary: 'Get application by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.RECRUITMENT_CREATE)
  @ApiOperation({ summary: 'Create application' })
  create(@Body() dto: CreateJobApplicationDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.RECRUITMENT_UPDATE)
  @ApiOperation({ summary: 'Update application' })
  update(@Param('id') id: string, @Body() dto: UpdateJobApplicationDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.RECRUITMENT_DELETE)
  @ApiOperation({ summary: 'Delete application' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
