declare namespace CommonType {
  namespace Page {
    type Param = {
      page: number
      pageSize: number
    }

    type Result<T> = {
      records: T[]
      total: number
    }
  }
}
