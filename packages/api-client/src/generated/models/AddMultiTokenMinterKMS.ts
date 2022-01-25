/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AddMultiTokenMinterKMS = {
    /**
     * Chain to work with.
     */
    chain: AddMultiTokenMinterKMS.chain;
    /**
     * Address of MultiToken token
     */
    contractAddress: string;
    /**
     * Address of MultiToken minter
     */
    minter: string;
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
    /**
     * Currency to pay for transaction gas, only valid for CELO chain.
     */
    feeCurrency?: AddMultiTokenMinterKMS.feeCurrency;
}

export namespace AddMultiTokenMinterKMS {

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
