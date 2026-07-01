import {
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { DocumentExpirationService } from './document-expiration.service';

@ApiTags('Documents / Expiration')
@ApiBearerAuth()
@Controller('documents/expiration')
export class DocumentExpirationController {
  constructor(private readonly service: DocumentExpirationService) {}

  @Post('mark-expired')
  @Roles('SUPER_ADMIN')
  @Permissions('documents.update')
  @ApiOperation({ summary: 'Mark expired documents' })
  markExpired() {
    return this.service.markExpired();
  }

  @Get('expired')
  @Roles('SUPER_ADMIN')
  @Permissions('documents.read')
  @ApiOperation({ summary: 'Get expired documents' })
  getExpired() {
    return this.service.getExpired();
  }

  @Get('soon/:days')
  @Roles('SUPER_ADMIN')
  @Permissions('documents.read')
  @ApiOperation({ summary: 'Get documents expiring soon' })
  getExpiringSoon(@Param('days') days: string) {
    return this.service.getExpiringSoon(Number(days));
  }
}
