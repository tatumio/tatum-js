/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EstimateFeeFromAddress = {
    /**
     * Blockchain to estimate fee for.
     */
    chain: 'BTC' | 'DOGE' | 'LTC';
    /**
     * Type of transaction
     */
    type: 'TRANSFER';
    /**
     * Array of addresses. Tatum will automatically scan last 100 transactions for each address and will use all of the unspent values. We advise to use this option if you have 1 address per 1 transaction only.
     */
    fromAddress: Array<string>;
    /**
     * Array of addresses and values to send bitcoins to. Values must be set in BTC. Difference between from and to is transaction fee.
     */
    to: Array<{
        /**
         * Destination address.
         */
        address: string;
        /**
         * Amount to be sent, in BTC.
         */
        value: number;
    }>;
}
