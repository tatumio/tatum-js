/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnMultiTokenBatch = {
    /**
     * Chain to work with.
     */
    chain: BurnMultiTokenBatch.chain;
    /**
     * Address of holder
     */
    account: string;
    /**
     * ID of token to be destroyed.
     */
    tokenId: Array<string>;
    /**
     * ID of token to be destroyed.
     */
    amounts: Array<string>;
    /**
     * Data in bytes
     */
    data?: string;
    /**
     * Address of Multi Token token
     */
    contractAddress: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Nonce to be set to transaction. If not present, last known nonce will be used.
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

export namespace BurnMultiTokenBatch {

    /**
     * Chain to work with.
     */
    export enum chain {
        ETH = 'ETH',
        ONE = 'ONE',
        MATIC = 'MATIC',
        KCS = 'KCS',
        BSC = 'BSC',
    }


}
