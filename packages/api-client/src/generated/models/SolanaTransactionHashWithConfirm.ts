/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SolanaTransactionHashWithConfirm = {
    /**
     * TX hash of successful transaction.
     */
    txId: string;
    /**
     * Indicates whether or not the transferred commitment has been fulfilled
     */
    confirmed: boolean;
}
