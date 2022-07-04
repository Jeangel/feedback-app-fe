export interface IPaginatedResults<T> {
  results: T[]
  pagination: {
    total: number
    pages: number
    currentPage: number
  }
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
