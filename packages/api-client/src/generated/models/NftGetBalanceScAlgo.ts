/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type NftGetBalanceScAlgo = {
    data?: Array<{
        /**
         * The asset ID (the ID of the NFT)
         */
        contractAddress?: string;
        /**
         * The array returning <code>1</code> to indicate that the NFT with the specified ID exists
         */
        balances?: Array<string>;
        metadata?: Array<{
            /**
             * The URL pointing to the NFT metadata; may not be present
             */
            url?: string;
        }>;
    }>;
}
