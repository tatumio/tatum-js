/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AddNftMinter = {
    /**
     * Chain to work with.
     */
    chain: AddNftMinter.chain;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * Address of NFT minter
     */
    minter: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
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
    /**
     * Currency to pay for transaction gas, only valid for CELO chain.
     */
    feeCurrency?: AddNftMinter.feeCurrency;
}

export namespace AddNftMinter {

    /**
     * Chain to work with.
     */
    export enum chain {
        ETH = 'ETH',
        MATIC = 'MATIC',
        KCS = 'KCS',
        CELO = 'CELO',
        ONE = 'ONE',
        BSC = 'BSC',
    }

    /**
     * Currency to pay for transaction gas, only valid for CELO chain.
     */
    export enum feeCurrency {
        CELO = 'CELO',
        CUSD = 'CUSD',
        CEUR = 'CEUR',
    }


}
