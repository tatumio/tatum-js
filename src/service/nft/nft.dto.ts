import { TokenIdContractAddress } from '../../dto'

export interface MetadataResponse {
  url: string
  metadata: object
  tokenId: string
}

export interface GetNftTransactionResponse extends TokenIdContractAddress {
  blockNumber: number
  txId: string
  from: string
  to: string
}

export type GetNftMetadata = TokenIdContractAddress

export interface GetTokenOwner extends TokenIdContractAddress {
  pageSize?: number
  page?: number
}

export interface CheckTokenOwner extends TokenIdContractAddress {
  /**
   * Owner address of the NFT token
   */
  owner: string
}

export interface NftTokenDetail {
  /**
   * Blockchain network
   */
  chain: string
  /**
   * Token ID
   */
  tokenId: string
  /**
   * Token contract address
   */
  tokenAddress: string
  /**
   * Token type. Either 'nft' (ERC-721) or 'multitoken' (ERC-1155)
   */
  tokenType: 'nft' | 'multitoken'
  /**
   * Token URI
   */
  metadataURI: string
  /**
   * Token metadata
   */
  metadata?: {
    name: string
    description: string
    image: string
    [metadataKey: string]: unknown
  }
}

export interface GetCollection {
  /**
   * Token contract address
   */
  tokenAddress: string
  /**
   * Optional flag to exclude metadata from the response. In this case, only token IDs are returned. Defaults to false.
   */
  excludeMetadata?: boolean
  pageSize?: number
  page?: number
}

export interface NftAddressBalance extends NftTokenDetail {
  /**
   * Balance of the address.
   */
  balance: string
  /**
   * Block number of the last balance update.
   */
  lastUpdatedBlock: number
}

export interface GetAllNftTransactionsQuery {
  /**
   * Token ID
   */
  tokenId: string
  /**
   * Token contract address
   */
  tokenAddress: string
  /**
   * Optional transaction type. If not specified, both incoming and outgoing transactions are returned.
   */
  transactionType?: 'incoming' | 'outgoing'
  /**
   * Optional from block. If not specified, all transactions are returned from the beginning of the blockchain.
   */
  fromBlock?: number
  /**
   * Optional to block. If not specified, all transactions are returned up till now.
   */
  toBlock?: number
  pageSize?: number
  page?: number
}

export interface GetAllNftTransactionsByAddress extends GetAllNftTransactionsQuery {
  /**
   * Addresses to get NFT transactions from.
   */
  addresses: string[]
}

export type NftTransaction = {
  /**
   * Blockchain network
   */
  chain: string
  /**
   * Block number
   */
  blockNumber: number
  /**
   * Transaction hash
   */
  hash: string
  /**
   * Transaction type
   */
  transactionType: 'incoming' | 'outgoing' | 'zero-transfer'
  /**
   * Index of the transaction in the block
   */
  transactionIndex: number
  /**
   * Address of the token collection
   */
  tokenAddress: string
  /**
   * Token ID
   */
  tokenId: string
  /**
   * Amount transferred. For outgoing transactions, it's a negative number. For zero-transfer transactions, it's always 0. For incoming transactions, it's a positive number.
   */
  amount: string
  /**
   * Transaction timestamp - UTC millis
   */
  timestamp: number
  /**
   * Address, on which transaction occurred. This is receiver address for incoming transactions and sender address for outgoing transactions.
   */
  address: string
  /**
   * Counter address of the transaction. This is sender address for incoming transactions on `address` and receiver address for outgoing transactions on `address`.
   */
  counterAddress: string
}
