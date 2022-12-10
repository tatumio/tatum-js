/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SolanaNftMetadata } from './SolanaNftMetadata';

export type SolanaListingData = {
    /**
     * Amount of NFTs to sold in this listing.
     */
    amount: string;
    /**
     * Address of the buyer, if exists.
     */
    buyer?: string;
    /**
     * ID of the listing
     */
    listingId: string;
    nft: {
        /**
         * NFT Address
         */
        address: string;
        data: SolanaNftMetadata;
    };
    /**
     * Price of the NFT asset in native currency or ERC20 token based on the presence of erc20Address field.
     */
    price: string;
    /**
     * Address of the seller.
     */
    seller: string;
    /**
     * State of the listing. 0 - available, 1 - sold, 2 - cancelled
     */
    state: '0' | '1' | '2';
    /**
     * Timestamp when this listing was created
     */
    createdAt: number;
    /**
     * Timestamp when this listing was purchased
     */
    purchasedAt?: number;
    /**
     * Timestamp when this listing was cancelled
     */
    cancelledAt?: number;
}
