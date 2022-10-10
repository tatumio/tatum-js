/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BtcTransactionFromUTXO = {
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
         * Private key of the UTXO to be spent.
         */
        privateKey: string;
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
    /**
     * Fee to be paid in BTC.
     */
    fee?: string;
    /**
     * Address, where unspent funds will be transferred.
     */
    changeAddress?: string;
}
