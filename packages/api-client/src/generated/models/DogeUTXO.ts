/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DogeUTXO = {
    scriptPubKey?: {
        asm?: string;
        hex?: string;
        type?: string;
        addresses?: Array<string>;
    };
    /**
     * Version of the UTXO.
     */
    version?: number;
    height?: number;
    /**
     * Amount of UTXO in 1/1000000 DOGE.
     */
    value?: number;
    /**
     * Coinbase transaction - miner fee.
     */
    coinbase?: boolean;
    /**
     * Block hash.
     */
    bestblock?: string;
}
