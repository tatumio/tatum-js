/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ApproveErc20 = {
    /**
     * Chain to work with.
     */
    chain: 'ETH' | 'BSC' | 'MATIC' | 'KLAY' | 'ONE';
    /**
     * Amount to be approved for the spender.
     */
    amount: string;
    /**
     * Blockchain address of the new spender.
     */
    spender: string;
    /**
     * Address of ERC-20 token
     */
    contractAddress: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
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
     * Nonce to be set to transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
}