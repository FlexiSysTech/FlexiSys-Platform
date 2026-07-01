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

import { Permission, Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@ApiTags('Accounting / Accounts')
@ApiBearerAuth()
@Controller('accounting/accounts')
export class AccountsController {
  constructor(private readonly service: AccountsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ACCOUNTING_READ)
  @ApiOperation({ summary: 'Get chart of accounts' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ACCOUNTING_READ)
  @ApiOperation({ summary: 'Get account by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ACCOUNTING_CREATE)
  @ApiOperation({ summary: 'Create account' })
  create(@Body() dto: CreateAccountDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ACCOUNTING_UPDATE)
  @ApiOperation({ summary: 'Update account' })
  update(@Param('id') id: string, @Body() dto: UpdateAccountDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ACCOUNTING_DELETE)
  @ApiOperation({ summary: 'Delete account' })
  remove(@Param('id') id: string, @Query('createdById') createdById?: string) {
    return this.service.remove(id, createdById);
  }
}
