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
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompaniesService } from './companies.service';

@ApiTags('Organization / Companies')
@ApiBearerAuth()
@Controller('organization/companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ORGANIZATION_READ)
  @ApiOperation({
    summary: 'Get all companies',
  })
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ORGANIZATION_READ)
  @ApiOperation({
    summary: 'Get company by id',
  })
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ORGANIZATION_CREATE)
  @ApiOperation({
    summary: 'Create company',
  })
  create(@Body() dto: CreateCompanyDto) {
    return this.companiesService.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ORGANIZATION_UPDATE)
  @ApiOperation({
    summary: 'Update company',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCompanyDto,
  ) {
    return this.companiesService.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ORGANIZATION_DELETE)
  @ApiOperation({
    summary: 'Delete company',
  })
  remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }
}
