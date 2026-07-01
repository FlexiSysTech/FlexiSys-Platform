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
import { CreateInterviewEvaluationDto } from './dto/create-interview-evaluation.dto';
import { UpdateInterviewEvaluationDto } from './dto/update-interview-evaluation.dto';
import { InterviewEvaluationsService } from './interview-evaluations.service';

@ApiTags('Recruitment / Interview Evaluations')
@ApiBearerAuth()
@Controller('recruitment/interview-evaluations')
export class InterviewEvaluationsController {
  constructor(private readonly service: InterviewEvaluationsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('recruitment.read')
  @ApiOperation({ summary: 'Get all interview evaluations' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('recruitment.read')
  @ApiOperation({ summary: 'Get interview evaluation by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('recruitment.create')
  @ApiOperation({ summary: 'Create interview evaluation' })
  create(@Body() dto: CreateInterviewEvaluationDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('recruitment.update')
  @ApiOperation({ summary: 'Update interview evaluation' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateInterviewEvaluationDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('recruitment.delete')
  @ApiOperation({ summary: 'Delete interview evaluation' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
