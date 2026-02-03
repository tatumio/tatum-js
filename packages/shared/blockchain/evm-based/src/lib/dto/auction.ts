export interface Auction {
  /*
   address of the seller
   */
  seller: string
  /*
   address of the token to sale
   */
  nftAddress: string
  /*
   ID of the NFT
   */
  tokenId: string
  /*
   if the auction is for ERC721 - true - or ERC1155 - false
   */
  isErc721: boolean
  /*
   Block height of end of auction
   */
  endedAt: string
  /*
   Block height, in which the auction started.
   */
  startedAt: string
  /*
   optional - if the auction is settled in the ERC20 token or in native currency
   */
  erc20Address?: string
  /*
   for ERC-1155 - how many tokens are for sale
   */
  amount: string
  /*
   Ending price of the asset at the end of the auction
   */
  endingPrice: string
  /*
   Actual highest bidder
   */
  bidder?: string

  /*
   Actual highest bid
   */
  highestBid?: string
}
