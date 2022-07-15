export interface IPagination {
  total: number
  pages: number
  currentPage: number
}

export interface IPaginatedResults<T> {
  results: T[]
  pagination: IPagination
}

export interface IPaginationArgs {
  pagination: {
    limit?: number
    page?: number
  }
  sort?: ISortArgs
}

export interface ISortArgs {
  by: string
  order: 1 | -1
}
