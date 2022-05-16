/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintNftExpressSolana = {
    /**
     * Chain to work with.
     */
    chain: 'SOL';
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    metadata: {
        /**
         * Name of the NFT token.
         */
        name: string;
        /**
         * Symbol of the NFT token.
         */
        symbol: string;
        /**
         * Basis points of the seller fee.
         */
        sellerFeeBasisPoints: number;
        /**
         * Metadata of the token. See https://eips.ethereum.org/EIPS/eip-721#specification for more details.
         */
        uri: string;
        /**
         * Royalty receivers for NFT transfers.
         */
        creators?: Array<any>;
    };
}
