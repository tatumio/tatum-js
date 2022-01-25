/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferQuorum = {
    /**
     * Blockchain address to send transaction from
     */
    from: string;
    /**
     * Blockchain address to send transaction to
     */
    to: string;
    /**
     * Additinal data, that can be passed to blockchain transaction as data property.
     */
    data?: string;
    /**
     * Nonce to be set to transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Amount to be sent in native asset in HEX.
     */
    amount?: string;
}
