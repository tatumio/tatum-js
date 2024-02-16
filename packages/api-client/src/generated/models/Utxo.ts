/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChainUtxoEnum } from './ChainUtxoEnum';

export type Utxo = {
    chain: ChainUtxoEnum;
    /**
     * Address of the UTXO
     */
    address: string;
    /**
     * Hash of the transaction this UTXO is present in
     */
    txHash: string;
    /**
     * Index of the UTXO in the transaction
     */
    index: number;
    /**
     * Value of the UTXO, in BTC, LTC or DOGE.
     */
    value: number;
    /**
     * String representation of the value of the UTXO, in BTC, LTC or DOGE.
     */
    valueAsString: string;
}
