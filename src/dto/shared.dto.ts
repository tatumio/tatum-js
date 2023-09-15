export interface IdDto {
  id: string
}

export interface TokenAddress {
  /**
   * Token contract address
   */
  tokenAddress: string
}

export interface TokenIdContractAddress extends TokenAddress {
  /**
   * Token ID
   */
  tokenId: string
}

export interface AddressBalanceDetails extends AddressBalanceFilters {
  /**
   * Optional page size. If not specified, the default page size is used, which is 10.
   */
  pageSize?: number
  /**
   * Optional page number. If not specified, the first page is returned.
   */
  page?: number
}

export interface AddressBalanceFilters {
  /**
   * List of addresses to check.
   */
  addresses: string[]
}

export interface AddressBalanceFiltersTron {
  /**
   * Address to check.
   */
  address: string
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
  tokenType: 'fungbile' | 'nft' | 'multitoken'
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
