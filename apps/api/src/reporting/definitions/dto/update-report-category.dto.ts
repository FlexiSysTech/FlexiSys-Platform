import { PartialType } from '@nestjs/swagger';

import { CreateReportCategoryDto } from './create-report-category.dto';

export class UpdateReportCategoryDto extends PartialType(
  CreateReportCategoryDto,
) {}
