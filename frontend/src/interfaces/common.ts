export interface BasicResponse<T> {
  data: T;
  success: boolean;
  errorMessage?: string;
}

export interface Pagination<T> {
  data: T;
  page: {
    total: number;
    limit: number;
    offset: number;
  };
}

export type PaginatedResponse<T> = BasicResponse<Pagination<T>>;
