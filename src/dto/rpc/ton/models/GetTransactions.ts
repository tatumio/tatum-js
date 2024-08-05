export interface GetTransactions {
  address: string
  limit?: number
  It?: number
  hash?: string
  to_It?: number
  archival?: boolean
}
