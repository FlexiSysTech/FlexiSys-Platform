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
import { CreateOfferLetterDto } from './dto/create-offer-letter.dto';
import { RejectOfferLetterDto } from './dto/reject-offer-letter.dto';
import { UpdateOfferLetterDto } from './dto/update-offer-letter.dto';
import { OfferLettersService } from './offer-letters.service';

@ApiTags('Recruitment / Offer Letters')
@ApiBearerAuth()
@Controller('recruitment/offer-letters')
export class OfferLettersController {
  constructor(private readonly service: OfferLettersService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('recruitment.read')
  @ApiOperation({ summary: 'Get all offer letters' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('recruitment.read')
  @ApiOperation({ summary: 'Get offer letter by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('recruitment.create')
  @ApiOperation({ summary: 'Create offer letter' })
  create(@Body() dto: CreateOfferLetterDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('recruitment.update')
  @ApiOperation({ summary: 'Update offer letter' })
  update(@Param('id') id: string, @Body() dto: UpdateOfferLetterDto) {
    return this.service.update(id, dto);
  }

  @Post(':id/send')
  @Roles('SUPER_ADMIN')
  @Permissions('recruitment.update')
  @ApiOperation({ summary: 'Send offer letter' })
  send(@Param('id') id: string) {
    return this.service.send(id);
  }

  @Post(':id/accept')
  @Roles('SUPER_ADMIN')
  @Permissions('recruitment.update')
  @ApiOperation({ summary: 'Accept offer letter' })
  accept(@Param('id') id: string) {
    return this.service.accept(id);
  }

  @Post(':id/reject')
  @Roles('SUPER_ADMIN')
  @Permissions('recruitment.update')
  @ApiOperation({ summary: 'Reject offer letter' })
  reject(@Param('id') id: string, @Body() dto: RejectOfferLetterDto) {
    return this.service.reject(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('recruitment.delete')
  @ApiOperation({ summary: 'Delete offer letter' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
