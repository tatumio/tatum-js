/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DogeTx = {
    /**
     * Transaction hash.
     */
    hash?: string;
    /**
     * Size of the transaction.
     */
    size?: number;
    vsize?: number;
    /**
     * Index of the transaction.
     */
    version?: number;
    /**
     * List of transactions, from which assets are being sent.
     */
    vin?: Array<{
        /**
         * Transaction hash of the input.
         */
        txid?: string;
        /**
         * Transaction index of the input.
         */
        vout?: number;
        scriptSig?: {
            asm?: string;
            hex?: string;
        };
        sequence?: number;
    }>;
    /**
     * List of recipient addresses and amounts to send to each of them.
     */
    vout?: Array<{
        /**
         * Amount of UTXO in 1/1000000 DOGE.
         */
        value?: number;
        /**
         * Transaction index of the output.
         */
        'n'?: number;
        scriptPubKey?: {
            asm?: string;
            hex?: string;
            type?: string;
            addresses?: Array<string>;
        };
    }>;
    locktime?: number;
}
