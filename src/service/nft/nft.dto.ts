import { Chain } from '../tatum/tatum.dto'

export interface TokenIdContractAddress {
  tokenId: string
  contractAddress: string
}

export interface GetBalance {
  address: string
  chain: Chain
}

export interface GetBalanceResponse {
  contractAddress: string
  balances: string[]
  metadata: MetadataResponse[]
}

export interface MetadataResponse {
  url: string
  metadata: object
  tokenId: string
}

export interface GetNftTransactions extends TokenIdContractAddress {
  chain: Chain
  pageSize?: string
}

export interface GetNftTransactionResponse extends TokenIdContractAddress {
  blockNumber: number
  txId: string
  from: string
  to: string
}

export interface GetNftMetadata extends TokenIdContractAddress {
  chain: Chain
}

export interface GetNftMetadataResponse {
  data: string
}

export interface GetCollection {
  chain: Chain
  contractAddress: string
  pageSize?: string
}

export interface GetCollectionResponse {
  tokenId: string
  metadata: MetadataResponse
}
