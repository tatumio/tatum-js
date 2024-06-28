/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintMultiToken = {
    /**
     * Chain to work with.
     */
    chain: 'ETH' | 'ONE' | 'MATIC' | 'KCS' | 'KLAY' | 'BSC' | 'FLR' | 'CRO' | 'BASE' | 'AVAX' | 'OPTIMISM' | 'FTM';
    /**
     * ID of token to be created.
     */
    tokenId: string;
    /**
     * Blockchain address to send Multi Token token to
     */
    to: string;
    /**
     * Address of Multi Token token
     */
    contractAddress: string;
    /**
     * amount of token to be created.
     */
    amount: string;
    /**
     * Data in bytes
     */
    data?: string;
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
