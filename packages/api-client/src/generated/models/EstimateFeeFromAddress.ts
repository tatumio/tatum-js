/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EstimateFeeFromAddress = {
    /**
     * Blockchain to estimate fee for.
     */
    chain: EstimateFeeFromAddress.chain;
    /**
     * Type of transaction
     */
    type: EstimateFeeFromAddress.type;
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

export namespace EstimateFeeFromAddress {

    /**
     * Blockchain to estimate fee for.
     */
    export enum chain {
        BTC = 'BTC',
        LTC = 'LTC',
    }

    /**
     * Type of transaction
     */
    export enum type {
        TRANSFER = 'TRANSFER',
    }


}
