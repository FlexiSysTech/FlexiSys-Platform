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
import { CreateSelfServiceRequestDto } from './dto/create-self-service-request.dto';
import { ReviewSelfServiceRequestDto } from './dto/review-self-service-request.dto';
import { UpdateSelfServiceRequestDto } from './dto/update-self-service-request.dto';
import { SelfServiceRequestsService } from './self-service-requests.service';

@ApiTags('ESS / Requests')
@ApiBearerAuth()
@Controller('ess/requests')
export class SelfServiceRequestsController {
  constructor(private readonly service: SelfServiceRequestsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ESS_READ)
  @ApiOperation({ summary: 'Get all self-service requests' })
  findAll() {
    return this.service.findAll();
  }

  @Get('employee/:employeeId')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ESS_READ)
  @ApiOperation({ summary: 'Get requests by employee' })
  findByEmployee(@Param('employeeId') employeeId: string) {
    return this.service.findByEmployee(employeeId);
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ESS_READ)
  @ApiOperation({ summary: 'Get self-service request by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ESS_CREATE)
  @ApiOperation({ summary: 'Create self-service request' })
  create(@Body() dto: CreateSelfServiceRequestDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ESS_UPDATE)
  @ApiOperation({ summary: 'Update draft self-service request' })
  update(@Param('id') id: string, @Body() dto: UpdateSelfServiceRequestDto) {
    return this.service.update(id, dto);
  }

  @Post(':id/submit')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ESS_UPDATE)
  @ApiOperation({ summary: 'Submit self-service request' })
  submit(@Param('id') id: string) {
    return this.service.submit(id);
  }

  @Post(':id/review')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ESS_UPDATE)
  @ApiOperation({ summary: 'Review self-service request' })
  review(@Param('id') id: string, @Body() dto: ReviewSelfServiceRequestDto) {
    return this.service.review(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ESS_DELETE)
  @ApiOperation({ summary: 'Delete self-service request' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
