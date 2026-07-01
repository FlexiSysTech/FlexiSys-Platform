import { PartialType } from '@nestjs/swagger';

import { CreatePayrollItemDto } from './create-payroll-item.dto';

export class UpdatePayrollItemDto extends PartialType(CreatePayrollItemDto) {}
