/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferMultiTokenBatch = {
    /**
     * Chain to work with.
     */
    chain: TransferMultiTokenBatch.chain;
    /**
     * Blockchain address to send Multi Token token to
     */
    to: string;
    /**
     * ID of token.
     */
    tokenId: Array<string>;
    /**
     * amounts of token.
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

export namespace TransferMultiTokenBatch {

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
