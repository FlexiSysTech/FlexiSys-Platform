import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../common/decorators/permissions.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { AiCoreService } from './ai-core.service';
import { AiCompletionDto } from './dto/ai-completion.dto';
import { AiProviderQueryDto, AiRequestLogQueryDto } from './dto/ai-query.dto';
import { CreateAiProviderConfigDto } from './dto/create-ai-provider-config.dto';
import { UpdateAiProviderConfigDto } from './dto/update-ai-provider-config.dto';

@ApiTags('AI / Core')
@ApiBearerAuth()
@Controller('ai')
export class AiCoreController {
  constructor(private readonly service: AiCoreService) {}

  @Get('providers')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_READ)
  @ApiOperation({ summary: 'Get AI provider configurations' })
  findProviders(@Query() query: AiProviderQueryDto) {
    return this.service.findProviders(query);
  }

  @Post('providers')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_CREATE)
  @ApiOperation({ summary: 'Create AI provider configuration' })
  createProvider(@Body() dto: CreateAiProviderConfigDto) {
    return this.service.createProvider(dto);
  }

  @Patch('providers/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_UPDATE)
  @ApiOperation({ summary: 'Update AI provider configuration' })
  updateProvider(@Param('id') id: string, @Body() dto: UpdateAiProviderConfigDto) {
    return this.service.updateProvider(id, dto);
  }

  @Delete('providers/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_DELETE)
  @ApiOperation({ summary: 'Soft delete AI provider configuration' })
  removeProvider(@Param('id') id: string) {
    return this.service.removeProvider(id);
  }

  @Post('complete')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_EXECUTE)
  @ApiOperation({ summary: 'Run an AI completion request' })
  complete(@Body() dto: AiCompletionDto) {
    return this.service.complete(dto);
  }

  @Get('requests')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_READ)
  @ApiOperation({ summary: 'Get AI request logs' })
  findRequestLogs(@Query() query: AiRequestLogQueryDto) {
    return this.service.findRequestLogs(query);
  }

  @Get('usage')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_READ)
  @ApiOperation({ summary: 'Get AI usage records' })
  findUsage(@Query() query: AiRequestLogQueryDto) {
    return this.service.findUsage(query);
  }
}
