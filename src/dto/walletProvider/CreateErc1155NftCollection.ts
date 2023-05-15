export interface CreateErc1155NftCollection {
  /**
   * base URI of the collection, defaults to empty string. Base URI is prepended to the token ID in the token URI.
   */
  baseURI?: string
  /**
   * (Optional) Address of the admin of the token. Defaults to the connected MetaMask account. Admin can add new minters and pausers.
   */
  author?: string
  /**
   * (Optional) Address of the minter of the token. Defaults to the connected MetaMask account. Minters can mint new tokens.
   */
  minter?: string
}
