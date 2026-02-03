enum ListingState {
  INITIATED = '0',
  SOLD = '1',
  CANCELLED = '2',
}

export interface MarketplaceListing {
  /**
   * ID of the listing
   */
  listingId: string

  /**
   * whether listing is for ERC721 or ERC1155
   */
  isErc721: boolean

  /**
   * State of the listing,
   */
  state: ListingState

  /**
   * Address of the NFT asset contract
   */
  nftAddress: string

  /**
   * Address of the seller
   */
  seller: string

  /**
   * Address of the ERC20 token, which will be used for paying. 0x0 if native asset is used
   */
  erc20Address: string

  /**
   * TokenID to sell
   */
  tokenId: string

  /**
   * Amount of assets to sell. Valid only for ERC1155.
   */
  amount: string

  /**
   * Price to sell asset for.
   */
  price: string

  /**
   * Address of the buyer, if already exists.
   */
  buyer: string
}
