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
     * The version of the transaction
     */
    version?: number;
    /**
     * The height (number) of the block where the transaction is included in
     */
    height?: number;
    /**
     * The amount of the UTXO (in 1/1000000 DOGE)
     */
    value?: number;
    /**
     * If set to "true", the transaction is a coinbase transaction (a transaction created by a Bitcoin miner to collect their reward)
     */
    coinbase?: boolean;
    /**
     * The block hash
     */
    bestblock?: string;
}
