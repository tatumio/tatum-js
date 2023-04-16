import { Chain } from '../notification'

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
  blockNumber: number[]
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

export interface NftBalanceDetails {
  chain: Chain
  addresses: string[]
}

export type NftBalances = Partial<Record<Chain, Record<string, NftBalance[]>>>

export type NftBalance = {
  contractAddress: string
  tokenId: string
  metadataUri: string
  metadata: object
}

export interface GetAllNftTransactionsQuery {
  pageSize: number
  offset: number
  nftTransactionsDetails: NftTransactionsDetails[]
}

export interface NftTransactionsDetails {
  chain: Chain
  tokenId?: string
  contractAddress?: string
  fromBlock?: number
  toBlock?: number
}

export type NftTransactions = Partial<Record<Chain, NftTransaction[]>>

export type NftTransaction = {
  blockNumber: number
  txId: string
  contractAddress: string
  tokenId: string
  from: string
  to: string
}
