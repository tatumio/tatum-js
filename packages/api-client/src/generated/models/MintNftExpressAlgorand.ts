/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintNftExpressAlgorand = {
    /**
     * Chain to work with.
     */
    chain: 'ALGO';
    /**
     * Metadata of the token. See https://eips.ethereum.org/EIPS/eip-721#specification for more details.
     */
    url: string;
    /**
     * Name of the NFT.
     */
    name: string;
    attr?: {
        /**
         * NFT unit name.
         */
        assetUnit?: string;
        /**
         * Address of clawback account.
         */
        clawback?: string;
        /**
         * Address of manager account.
         */
        manager?: string;
        /**
         * Address of reserve account.
         */
        reserve?: string;
        /**
         * Address of freeze account.
         */
        freeze?: string;
    };
}
