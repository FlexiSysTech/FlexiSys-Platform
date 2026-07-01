import { BadRequestException, Injectable } from '@nestjs/common';

import { PaginationQueryDto } from './pagination.dto';
import {
  ListQueryOptions,
  PaginationMeta,
  PaginationResult,
} from './pagination.types';

@Injectable()
export class PaginationService {
  normalize(query: ListQueryOptions = {}): Required<ListQueryOptions> {
    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));

    return {
      page,
      limit,
      search: query.search?.trim() ?? '',
      searchFields: query.searchFields ?? [],
      sortBy: query.sortBy ?? '',
      sortOrder: query.sortOrder ?? 'asc',
    };
  }

  getSkipTake(query: ListQueryOptions = {}) {
    const normalized = this.normalize(query);

    return {
      skip: (normalized.page - 1) * normalized.limit,
      take: normalized.limit,
    };
  }

  buildMeta(totalItems: number, query: ListQueryOptions = {}): PaginationMeta {
    const normalized = this.normalize(query);
    const totalPages = Math.max(1, Math.ceil(totalItems / normalized.limit));

    return {
      page: normalized.page,
      limit: normalized.limit,
      totalItems,
      totalPages,
      hasNextPage: normalized.page < totalPages,
      hasPreviousPage: normalized.page > 1,
    };
  }

  buildResponse<T>(
    data: T[],
    totalItems: number,
    query: ListQueryOptions = {},
  ): PaginationResult<T> {
    return {
      data,
      meta: this.buildMeta(totalItems, query),
    };
  }

  assertAllowedSort(
    query: PaginationQueryDto,
    allowedFields: readonly string[],
  ): void {
    if (query.sortBy && !allowedFields.includes(query.sortBy)) {
      throw new BadRequestException(`Unsupported sort field: ${query.sortBy}`);
    }
  }
}
