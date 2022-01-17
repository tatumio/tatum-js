/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeployNftKMS = {
    /**
     * Chain to work with.
     */
    chain: DeployNftKMS.chain;
    /**
     * Name of the NFT token
     */
    name: string;
    /**
     * True if the contract is provenance type
     */
    provenance?: boolean;
    /**
     * True if the contract is publicMint type
     */
    publicMint?: boolean;
    /**
     * Symbol of the NFT token
     */
    symbol: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
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

export namespace DeployNftKMS {

    /**
     * Chain to work with.
     */
    export enum chain {
        ETH = 'ETH',
        MATIC = 'MATIC',
        KCS = 'KCS',
        ONE = 'ONE',
        BSC = 'BSC',
    }


}
