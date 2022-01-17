/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnMultiTokenBatchKMS = {
    /**
     * Chain to work with.
     */
    chain: BurnMultiTokenBatchKMS.chain;
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
    amounts?: Array<string>;
    /**
     * Data in bytes
     */
    data?: string;
    /**
     * Address of Multi Token token
     */
    contractAddress: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
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

export namespace BurnMultiTokenBatchKMS {

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
