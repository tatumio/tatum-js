/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferOneBlockchain = {
    /**
     * Additional data, that can be passed to blockchain transaction as data property.
     */
    data?: string;
    /**
     * Currency of the transfer.
     */
    currency: 'ONE';
    /**
     * Nonce to be set to ONE transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Blockchain address to send assets
     */
    to: string;
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
     * Amount to be sent in One.
     */
    amount: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}
