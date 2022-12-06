/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BtcTxOutput = {
    /**
     * Sent amount in satoshis.
     */
    value?: number;
    /**
     * Transaction script.
     */
    script?: string;
    /**
     * Recipient address.
     */
    address?: string;
}
