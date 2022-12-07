/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type LtcTransactionUTXO = {
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
        /**
         * Private key of the UTXO to be spent. Private key, or signature Id must be present.
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
