/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnMultiTokenBatch = {
    /**
     * Chain to work with.
     */
    chain: 'ETH' | 'ONE' | 'MATIC' | 'KCS' | 'KLAY' | 'BSC' | 'FLR' | 'CRO' | 'BASE' | 'AVAX' | 'OPTIMISM' | 'FTM';
    /**
     * Address of holder
     */
    account: string;
    /**
     * The IDs of the Multi Tokens to be destroyed.
     */
    tokenId: Array<string>;
    /**
     * The amounts of the Multi Tokens to be destroyed.
     */
    amounts: Array<string>;
    /**
     * The address of the Multi Token smart contract
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
