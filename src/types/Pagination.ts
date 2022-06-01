export interface IPaginatedResults<T> {
  results: T[]
  total: number
}

export interface IPaginationArgs {
  pagination: {
    limit?: number
    offset?: number
  }
}
