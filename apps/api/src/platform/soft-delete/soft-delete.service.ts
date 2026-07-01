import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { RequestContextService } from '../request-context';
import {
  RestoreOptions,
  SoftDeleteDelegate,
  SoftDeleteFields,
  SoftDeleteOptions,
  SoftDeleteResult,
} from './soft-delete.types';

@Injectable()
export class SoftDeleteService {
  constructor(private readonly contextService: RequestContextService) {}

  activeWhere<TWhere extends Record<string, unknown>>(where?: TWhere) {
    return {
      ...(where ?? {}),
      deletedAt: null,
    };
  }

  deletedWhere<TWhere extends Record<string, unknown>>(where?: TWhere) {
    return {
      ...(where ?? {}),
      deletedAt: { not: null },
    };
  }

  async softDelete<TRecord extends SoftDeleteFields>(
    delegate: SoftDeleteDelegate<TRecord>,
    id: string,
    options: SoftDeleteOptions = {},
  ): Promise<SoftDeleteResult<TRecord>> {
    const current = await delegate.findUnique({ where: { id } });

    if (!current) {
      throw new NotFoundException('Record not found');
    }

    if (current.deletedAt) {
      throw new BadRequestException('Record is already deleted');
    }

    const record = await delegate.update({
      where: { id },
      data: {
        deletedAt: options.deletedAt ?? new Date(),
        deletedById: options.deletedById ?? this.contextService.getUserId(),
      },
    });

    return { deleted: true, record };
  }

  async restore<TRecord extends SoftDeleteFields>(
    delegate: SoftDeleteDelegate<TRecord>,
    id: string,
    _options: RestoreOptions = {},
  ): Promise<SoftDeleteResult<TRecord>> {
    const current = await delegate.findUnique({ where: { id } });

    if (!current) {
      throw new NotFoundException('Record not found');
    }

    if (!current.deletedAt) {
      throw new BadRequestException('Record is not deleted');
    }

    const record = await delegate.update({
      where: { id },
      data: {
        deletedAt: null,
        deletedById: null,
      },
    });

    return { restored: true, record };
  }
}
