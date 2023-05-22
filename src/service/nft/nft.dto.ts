import { TokenIdContractAddress } from '../../dto'
export interface CreateMultiTokenNftCollection {
  /**
   * Address of the NFT collection owner
   */
  owner: string
  /**
   * Address of the NFT collection minter, this is optional and defaults to the owner address
   */
  minter?: string
  /**
   * Optional base URI, which will be prepended to the token URI. If not specified, the token should be minted with the URI
   */
  baseURI?: string
}

export interface CreateNftCollection extends CreateMultiTokenNftCollection{
  /**
   * Name of the NFT collection, e.g. Bored Ape Yacht Club
   */
  name: string
  /**
   * Symbol of the NFT collection, e.g. BAYC
   */
  symbol: string
}

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
  /**
   * Optional page size. If not specified, the default page size is used, which is 10.
   */
  pageSize?: number
  /**
   * Optional page number. If not specified, the first page is returned.
   */
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
   * Collection contract address
   */
  collectionAddress: string
  /**
   * Optional flag to exclude metadata from the response. In this case, only token IDs are returned. Defaults to false.
   */
  excludeMetadata?: boolean
  /**
   * Optional page size. If not specified, the default page size is used, which is 10.
   */
  pageSize?: number
  /**
   * Optional page number. If not specified, the first page is returned.
   */
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

export interface GetAllNftTransactionsQuery extends GetAllNftTransactionsQueryDetails{
  /**
   * Token ID
   */
  tokenId: string
  /**
   * Token contract address
   */
  tokenAddress: string
}

export interface GetAllNftTransactionsQueryDetails {
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
  /**
   * Optional page size. If not specified, the default page size is used, which is 10.
   */
  pageSize?: number
  /**
   * Optional page number. If not specified, the first page is returned.
   */
  page?: number
}

export interface GetAllNftTransactionsByAddress extends GetAllNftTransactionsQueryDetails {
  /**
   * Addresses to get NFT transactions from.
   */
  addresses: string[]
  /**
   * Token ID
   */
  tokenId?: string
  /**
   * Token contract address
   */
  tokenAddress?: string
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
