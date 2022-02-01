/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeployNft = {
    /**
     * Chain to work with.
     */
    chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'BSC' | 'ALGO';
    /**
     * Name of the NFT token
     */
    name: string;
    /**
     * Symbol of the NFT token
     */
    symbol: string;
    /**
     * Private key of Ethereum account address, from which gas for deployment of ERC721 will be paid. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * True if the contract is provenance type
     */
    provenance?: boolean;
    /**
     * True if the contract is publicMint type
     */
    publicMint?: boolean;
    /**
     * Nonce to be set to Ethereum transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Custom defined fee. If not present, it will be calculated automatically.
     */
    fee?: {
        /**
         * Gas limit for transaction in gas price.
         */
        gasLimit: string;
        /**
         * Gas price in Gwei.
         */
        gasPrice: string;
    };
}
