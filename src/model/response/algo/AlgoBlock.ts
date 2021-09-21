import {AlgoTx} from './AlgoTx'

/**
 *
 * @export
 * @interface AlgoBlock
 */
export interface AlgoBlock {
    /**
     * [gh]hash to which this block belongs.
     * @type {string}
     * @memberof AlgoBlock
     */
    genesisHash: string;

    /**
     * [gen] ID hash to which this block belongs.
     * @type {string}
     * @memberof AlgoBlock
     */
    genesisId: string;

    /**
     * [prev] Previous block hash.
     * @type {string}
     * @memberof AlgoBlock
     */
    previousBlockHash: string;
    
    /**
     * (optional)
     * @type {any}
     * @memberof AlgoBlock
     */
    rewards: any;
    
    /**
     * [rnd] Current round on which this block was appended to the chain.
     * @type {string}
     * @memberof AlgoBlock
     */
    round: string;

    /**
     * [seed] Sortition seed.
     * @type {string}
     * @memberof AlgoBlock
     */
    seed: string;

    /**
     * [ts] Block creation timestamp in seconds since eposh.
     * @type {number}
     * @memberof AlgoBlock
     */
    timestamp: number;

    /**
     * [txns]list of transactions corresponding to a given round.
     * @type {Array<AlgoTx>}
     * @memberof AlgoBlock
     */
    txns: AlgoTx[];

    /**
     * [txn] TransactionsRoot authenticates the set of transactions appearing in the block.
     * More specifically, it's the root of a merkle tree whose leaves are the block's Txids, in lexicographic order.
     * For the empty block, it's 0.
     * Note that the TxnRoot does not authenticate the signatures on the transactions, only the transactions themselves.
     * Two blocks with the same transactions but in a different order and with different order and with different signatures will have the same TxnRot.
     * @type {string}
     * @memberof AlgoBlock
     */
    txn: string;

    /**
     * [tc] TxnCounter counts the number of transactions committed in the ledger, from the time at which support for this feature was introduced.
     * (optional)
     * @type {number}
     * @memberof AlgoBlock
     */
    txnc: number;

    /**
     * (optional)
     * @type {any}
     * @memberof AlgoBlock
     */

    upgradeState: any;

    /**
     * (optional)
     * @type {any}
     * @memberof AlgoBlock
     */
    upgradeVote: any;

}