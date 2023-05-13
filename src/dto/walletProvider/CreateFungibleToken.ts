export interface CreateFungibleToken {
  /**
   * Name of the token.
   */
  name: string
  /**
   * Symbol of the token.
   */
  symbol: string
  /**
   * Number of decimals of the token. Defaults to 18.
   */
  decimals?: number
  /**
   * Total supply of the token.
   */
  initialSupply: string
  /**
   * (Optional) Address of the initial holder of the token. Defaults to the connected MetaMask account.
   */
  initialHolder?: string
  /**
   * (Optional) Address of the admin of the token. Defaults to the connected MetaMask account. Admin can add new minters and pausers.
   */
  admin?: string
  /**
   * (Optional) Address of the minter of the token. Defaults to the connected MetaMask account. Minters can mint new tokens.
   */
  minter?: string
  /**
   * (Optional) Address of the pauser of the token. Defaults to the connected MetaMask account. Pausers can pause and unpause the token transactions.
   */
  pauser?: string
}
