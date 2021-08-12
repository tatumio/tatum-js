/**
 *
 * @export
 * @interface DogeUTXO
 */
import {DogeTxOutputs} from './DogeTx'

export interface DogeUTXO extends DogeTxOutputs {
    confirmations: number;
    /**
     * Coinbase transaction - miner fee.
     * @type {boolean}
     * @memberof DogeUTXO
     */
    coinbase: boolean;
    bestblock: string;
    version: number;
}
