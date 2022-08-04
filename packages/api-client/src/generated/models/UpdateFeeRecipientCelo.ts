/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateFeeRecipientCelo = {
    /**
     * Blockchain to work with.
     */
    chain: 'CELO';
    /**
     * Address of the marketplace smart contract.
     */
    contractAddress: string;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
    /**
     * Recipient address of the marketplace fee.
     */
    feeRecipient: string;
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
}
