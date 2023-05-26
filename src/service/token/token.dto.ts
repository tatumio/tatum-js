import { TokenIdContractAddress } from '../../dto'

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
   * Initial supply of fungible token
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
  tokenType: 'fungible' //TODO Probably misprint, correct is 'type'

  /**
   * Block number of the last balance update.
   */
  lastUpdatedBlock: number

  /**
   * Address
   */
  address: string

  /**
   * Balance of the address.
   */
  balance: string
}

export type GetTokenMetadata = TokenIdContractAddress

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
   * Type of the token (e.g., ERC20, BEP20).
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
  tokenAddress: string
  /**
   * Addresses to fetch. Up to 10 addresses as a comma separated string.
   */
  addresses: string
  /**
   * Optional transaction type. If not specified, both incoming and outgoing transactions are returned.
   */
  transactionType?: 'incoming' | 'outgoing' | 'zero-transfer'
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

export type FungibleTransaction = {
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
