/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EstimateFeeFromUTXO = {
    /**
     * Blockchain to estimate fee for.
     */
    chain: EstimateFeeFromUTXO.chain;
    /**
     * Type of transaction
     */
    type: EstimateFeeFromUTXO.type;
    /**
     * Array of transaction hashes, index of UTXO in it and corresponding private keys. Use this option if you want to calculate amount to send manually. Either fromUTXO or fromAddress must be present.
     */
    fromUTXO: Array<{
        /**
         * Transaction hash of the UTXO to be spent.
         */
        txHash: string;
        /**
         * Index of the UTXO to be spent.
         */
        index: number;
    }>;
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

export namespace EstimateFeeFromUTXO {

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
