/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ScryptaTransaction = {
    /**
     * Array of addresses and corresponding private keys. Tatum will automatically scan last 100 transactions for each address and will use all of the unspent values. We advise to use this option if you have 1 address per 1 transaction only.
     */
    fromAddress?: Array<{
        /**
         * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
         */
        signatureId?: string;
        /**
         * Address to send assets from.
         */
        address: string;
        /**
         * Private key of the address to send assets from. Private key, or signature Id must be present.
         */
        privateKey?: string;
    }>;
    /**
     * Array of transaction hashes, index of UTXO in it and corresponding private keys. Use this option if you want to calculate amount to send manually. Either fromUTXO or fromAddress must be present.
     */
    fromUTXO?: Array<{
        /**
         * Transaction hash of the UTXO to be spent.
         */
        txHash: string;
        /**
         * Index of the UTXO to be spent.
         */
        index: string;
        /**
         * Private key of the UTXO to be spent.
         */
        privateKey?: string;
        /**
         * Identifier of the private key associated in signing application.
         */
        signatureId?: string;
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
