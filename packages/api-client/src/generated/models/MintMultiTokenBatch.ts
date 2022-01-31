/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintMultiTokenBatch = {
    /**
     * Chain to work with.
     */
    chain: 'ETH' | 'ONE' | 'MATIC' | 'KCS' | 'BSC';
    /**
     * Blockchain address to send Multi Token token to.
     */
    to: Array<string>;
    /**
     * ID of token to be created.
     */
    tokenId: Array<Array<string>>;
    /**
     * ID of token to be created.
     */
    amounts: Array<Array<string>>;
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
