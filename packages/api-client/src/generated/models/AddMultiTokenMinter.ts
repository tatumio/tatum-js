/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AddMultiTokenMinter = {
    /**
     * Chain to work with.
     */
    chain: 'ETH' | 'MATIC' | 'KCS' | 'CELO' | 'ONE' | 'BSC';
    /**
     * Address of MultiToken token
     */
    contractAddress: string;
    /**
     * Address of MultiToken minter
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
    feeCurrency?: 'CELO' | 'CUSD' | 'CEUR';
}
