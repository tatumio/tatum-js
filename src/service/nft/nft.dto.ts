import { Chain } from '../../utils/enum'

export interface GetBalance {
  address: string
  chain: Chain
}

export interface GetBalanceResponse {
  contractAddress: string
  balances: string[]
  metadata: BalanceMetadataResponse[]
}

export interface BalanceMetadataResponse {
  url: string
  metadata: object
  tokenId: string
}

export interface GetNftTransactions {
  chain: Chain
  tokenId: string
  contractAddress: string
  pageSize?: string
}

export interface GetNftTransactionResponse {
  blockNumber: number
  txId: string
  contractAddress: string
  tokenId: string
  from: string
  to: string
}
