/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeployNft = {
    /**
     * The blockchain to work with
     */
    chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'KLAY' | 'BSC';
    /**
     * Name of the NFT token
     */
    name: string;
    /**
     * Symbol of the NFT token
     */
    symbol: string;
    /**
     * Private key of account address, from which gas for deployment of ERC721 will be paid. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * True if the contract is provenance percentage royalty type. False by default. <a href="https://github.com/tatumio/smart-contracts" target="_blank">Details and sources avaiable here.</a>
     */
    provenance?: boolean;
    /**
     * True if the contract is fixed price royalty type. False by default. <a href="https://github.com/tatumio/smart-contracts" target="_blank">Details and sources avaiable here.</a>
     */
    cashback?: boolean;
    /**
     * True if the contract is publicMint type. False by default.
     */
    publicMint?: boolean;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    /**
     * The custom defined fee; if not present, will be calculated automatically
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
