/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GenerateCustodialWalletBatchKMS = {
    /**
     * Blockchain to work with.
     */
    chain: 'MATIC' | 'ETH' | 'ONE' | 'XDC' | 'BSC';
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Number of addresses to generate.
     */
    batchCount: number;
    /**
     * Owner of the addresses.
     */
    owner: string;
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
     * Nonce to be set to the transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
}
