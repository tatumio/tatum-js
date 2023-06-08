import { ApiBalanceResponse, ApiTxData, FungibleInfo } from '../../api/api.dto'
import { TokenAddress } from '../../dto'

export interface CreateFungibleToken {
  /**
   * Address of the fungible token owner
   */
  owner: string
  /**
   * Optional. Address of the fungible token minter, it defaults to the owner address
   */
  minter?: string
  /**
   * Optional. Address of the fungible token pauser, it defaults to the owner address
   */
  pauser?: string
  /**
   * Name of fungible token
   */
  name: string
  /**
   * Symbol of fungible token
   */
  symbol: string
  /**
   * Initial supply of fungible token
   */
  initialSupply: string
  /**
   * Initial holder of fungible token
   */
  initialHolder: string
  /**
   * Optional. Number of decimal places for the fungible token, it defaults to 18
   */
  decimals?: string
}

export interface FungibleTokenBalance {
  /**
   * Blockchain network
   */
  chain: string
  /**
   * Token contract address
   */
  tokenAddress: string
  /**
   * Token type, default 'fungible' (ERC-20).
   */
  type: 'fungible'

  /**
   * Block number of the last balance update.
   */
  lastUpdatedBlockNumber: number

  /**
   * Address
   */
  address: string

  /**
   * Balance of the address.
   */
  balance: string
}

export type GetTokenMetadata = TokenAddress

export interface TokenMetadata {
  /**
   * Symbol of the fungible token.
   */
  symbol: string
  /**
   * Full name of the fungible token
   */
  name: string
  /**
   * Total supply of the fungible token.
   */
  supply: string
  /**
   * Number of decimal places for the fungible token.
   */
  decimals: number
  /**
   * Type of the token - fungible
   */
  tokenType: string
  /**
   * Maximum supply cap of the fungible token.
   */
  cap: string
}

export interface GetAllFungibleTransactionsQuery {
  /**
   * Token contract address
   */
  tokenAddress?: string
  /**
   * Addresses to fetch. Up to 10 addresses as a comma separated string.
   */
  addresses: string[]
  /**
   * Optional transaction type. If not specified, both incoming and outgoing transactions are returned.
   */
  transactionTypes?: TransactionType[]
  /**
   * Optional from block. If not specified, all transactions are returned from the beginning of the blockchain.
   */
  blockFrom?: number
  /**
   * Optional to block. If not specified, all transactions are returned up till now.
   */
  blockTo?: number
  /**
   * Optional page size. If not specified, the default page size is used, which is 10.
   */
  pageSize?: number
  /**
   * Optional page number. If not specified, the first page is returned.
   */
  page?: number
}

export type TransactionType = 'incoming' | 'outgoing' | 'zero-transfer'

export interface Transaction {
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
  transactionType: 'fungible' | 'nft' | 'multitoken' | 'native' | 'internal'
  /**
   * Transaction sub type
   */
  transactionSubtype: 'incoming' | 'outgoing' | 'zero-transfer'
  /**
   * Index of the transaction in the block
   */
  transactionIndex: number
  /**
   * Address of the token collection
   */
  tokenAddress?: string
  /**
   * The ID of the token involved in the transaction (optional).
   */
  tokenId?: string
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
  counterAddress?: string
}

export interface TxIdResponse {
  /**
   * Id of the transaction
   */
  txId: string
}

export const mapper = {
  toFungibleTokenBalance: (apiResponse: ApiBalanceResponse): FungibleTokenBalance => ({
    chain: apiResponse.chain,
    tokenAddress: apiResponse.tokenAddress,
    type: apiResponse.type as 'fungible',
    lastUpdatedBlockNumber: apiResponse.lastUpdatedBlockNumber,
    address: apiResponse.address,
    balance: apiResponse.balance,
  }),
  toTokenMetadata: (apiResponse: FungibleInfo): TokenMetadata => ({
    symbol: apiResponse.symbol,
    name: apiResponse.name,
    supply: apiResponse.supply,
    decimals: apiResponse.decimals,
    tokenType: apiResponse.tokenType,
    cap: apiResponse.cap,
  }),
  toTransaction: (apiResponse: ApiTxData): Transaction => ({
    chain: apiResponse.chain,
    blockNumber: apiResponse.blockNumber,
    hash: apiResponse.hash,
    transactionType: apiResponse.transactionType,
    transactionIndex: apiResponse.transactionIndex,
    tokenAddress: apiResponse.tokenAddress,
    amount: apiResponse.amount,
    timestamp: apiResponse.timestamp,
    address: apiResponse.address,
    counterAddress: apiResponse.counterAddress,
    transactionSubtype: apiResponse.transactionSubtype,
  }),
  toCreateTokenResponse: (apiResponse: TxIdResponse): TxIdResponse => ({
    txId: apiResponse.txId,
  }),
}
