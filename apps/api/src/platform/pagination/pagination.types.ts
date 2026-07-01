export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface SortOptions<TAllowedField extends string = string> {
  sortBy?: TAllowedField;
  sortOrder?: 'asc' | 'desc';
}

export interface TextFilterOptions<TAllowedField extends string = string> {
  search?: string;
  searchFields?: TAllowedField[];
}

export interface ListQueryOptions<TAllowedField extends string = string>
  extends PaginationOptions,
    SortOptions<TAllowedField>,
    TextFilterOptions<TAllowedField> {}
