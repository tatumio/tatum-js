export interface AddressBalance {
  /**
   * Blockchain address of the balance.
   */
  address: string
  /**
   * Asset of the balance. For native currencies, it's always present. For tokens, only when readable from the contract `symbol()` method.
   */
  asset?: string
  /**
   * Decimals of the asset. Valid for native and fungible tokens. For tokens, only when readable from the contract `decimals()` method.
   */
  decimals?: number
  /**
   * Balance of the address.
   */
  balance: string
  /**
   * Type of the balance.
   */
  type: 'native' | 'fungible' | 'nft' | 'mutlitoken'
  /**
   * Optional token contract address. Valid only for tokens (USDT, NFTs of any kind), not for native network balances (ETH, BTC).
   */
  tokenAddress?: string
  /**
   * Optional token ID. Valid only for non-fungible and semi-fungible tokens.
   */
  tokenId?: string
  /**
   * Block number of the last balance update.
   */
  lastUpdatedBlockNumber?: number
}

export interface AddressBalanceDataApi {
  address: string
  symbol?: string
  name?: string
  balance: string
  type: string
  tokenAddress?: string
  tokenId?: string
}

export interface GetAddressTransactionsQuery {
  /**
   * Blockchain address to get transactions for.
   */
  address: string
  /**
   * Optional transaction type. If not specified, all transactions are returned. For networks that support only native transactions, this parameter is ignored.
   */
  transactionTypes?: ['fungible' | 'nft' | 'multitoken' | 'native']
  /**
   * Optional transaction type. If not specified, both incoming and outgoing transactions are returned.
   */
  transactionDirection?: 'incoming' | 'outgoing'
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
  /**
   * Optional token address. If specified, only transactions related to this token (smart contract) are returned.
   */
  tokenAddress?: string
}

export interface GetAddressTransactionsQueryTezos {
  /**
   * Blockchain address to get transactions for.
   */
  address?: string
  /**
   * Optional transaction type. If not specified, both incoming and outgoing transactions are returned.
   */
  transactionDirection?: 'incoming' | 'outgoing'
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
  /**
   * Optional cursor parameter for pagination. The cursor to obtain previous page or next page of the data. Available only for Tezos blockchain.
   */
  cursor?: string
}

export interface AddressTransaction {
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
  transactionIndex?: number
  /**
   * Address of the token collection, if the transaction is related to a token (ERC-20, ERC-721, ERC-1155)
   */
  tokenAddress?: string
  /**
   * Token ID, if the transaction is related to a NFT (ERC-721) or MutiToken (ERC-1155)
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
   * Not all blockchain networks can identify the counter address (UTXO chains like Bitcoin e.g., where there is multiple senders or recipients). In this case, the counter address is not returned.
   */
  counterAddress?: string
}
