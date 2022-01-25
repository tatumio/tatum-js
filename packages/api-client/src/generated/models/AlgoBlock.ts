/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlgoTx } from './AlgoTx';

export type AlgoBlock = {
    /**
     * hash to which this block belongs
     */
    genesisHash?: string;
    /**
     * ID to which this block belongs
     */
    genesisId?: string;
    /**
     * Previous block hash
     */
    previousBlockHash?: string;
    /**
     * rewards
     */
    rewards?: any;
    /**
     * Current round on which this block was appended to the chain
     */
    round?: number;
    /**
     * Sortition seed.
     */
    seed?: string;
    /**
     * Block creation timestamp in seconds since eposh
     */
    timestamp?: number;
    /**
     * Array of transactions
     */
    txns?: Array<AlgoTx>;
    /**
     * TransactionsRoot authenticates the set of transactions appearing in the block.
     */
    txn?: string;
    /**
     * TxnCounter counts the number of transations committed in the ledger
     */
    txnc?: number;
    /**
     * upgrade state
     */
    upgradeState?: any;
    /**
     * upgrade vote
     */
    upgradeVote?: any;
}
