/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type LtcTransactionAddress = {
    /**
     * Array of addresses and corresponding private keys. Tatum will automatically scan last 100 transactions for each address and will use all of the unspent values. We advise to use this option if you have 1 address per 1 transaction only.
     */
    fromAddress: Array<{
        /**
         * Address to send assets from.
         */
        address: string;
        /**
         * Private key of the address to send assets from. Private key, or signature Id must be present.
         */
        privateKey: string;
    }>;
    /**
     * Array of addresses and values to send Litecoins to. Values must be set in LTC. Difference between from and to is transaction fee.
     */
    to: Array<{
        /**
         * Destination address.
         */
        address: string;
        /**
         * Amount to be sent, in LTC.
         */
        value: number;
    }>;
    /**
     * Fee to be paid in LTC.
     */
    fee?: string;
    /**
     * Address, where unspent funds will be transferred.
     */
    changeAddress?: string;
}
