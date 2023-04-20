export interface IdDto {
  id: string
}

export interface TokenIdContractAddress {
  /**
   * Token ID
   */
  tokenId: string
  /**
   * Token contract address
   */
  tokenAddress: string
}

export interface AddressBalanceDetails {
  /**
   * List of addresses to check.
   */
  addresses: string[]
  pageSize?: number
  page?: number
}

export interface TokenDetails {
  /**
   * Name of the token
   */
  name?: string
  /**
   * Symbol of the token
   */
  symbol?: string
  /**
   * Type of the token
   */
  tokenTyoe: 'fungbile' | 'nft' | 'multitoken'
  /**
   * Decimals of the token. Available only for `fungible` tokens
   */
  decimals?: number
  /**
   * Supply of the token.
   */
  supply?: string
  /**
   * Total hard cap of the token, if present.
   */
  cap?: string
}
