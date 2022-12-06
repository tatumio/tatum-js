/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EvmListingData = {
    /**
     * Amount of NFTs to sold in this listing. Valid only for ERC1155 listings.
     */
    amount?: string;
    /**
     * Address of the buyer, if exists.
     */
    buyer?: string;
    /**
     * Address of the ERC20 token smart contract, which should be used for paying for the asset..
     */
    erc20Address?: string;
    /**
     * If the listing is for ERC721 or ERC1155 token.
     */
    isErc721?: boolean;
    /**
     * ID of the listing.
     */
    listingId?: string;
    /**
     * Address of the NFT smart contract.
     */
    nftAddress?: string;
    /**
     * Price of the NFT asset in native currency or ERC20 token based on the presence of erc20Address field.
     */
    price?: string;
    /**
     * Address of the seller.
     */
    seller?: string;
    /**
     * State of the listing. 0 - available, 1 - sold, 2 - cancelled
     */
    state?: '0' | '1' | '2';
}
