import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Permission, Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { HireCandidateDto } from './dto/hire-candidate.dto';
import { HiringService } from './hiring.service';

@ApiTags('Recruitment / Hiring')
@ApiBearerAuth()
@Controller('recruitment/hiring')
export class HiringController {
  constructor(private readonly hiringService: HiringService) {}

  @Post('hire')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.RECRUITMENT_UPDATE)
  @ApiOperation({ summary: 'Hire candidate and create employee' })
  hireCandidate(@Body() dto: HireCandidateDto) {
    return this.hiringService.hireCandidate(dto);
  }
}
