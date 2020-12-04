/**
 *
 * @export
 * @interface LtcTx
 */
export interface LtcTx {
    /**
     * Transaction hash.
     * @type {string}
     * @memberof LtcTx
     */
    hash: string;
    /**
     * Witness hash in case of a SegWit transaction.
     * @type {string}
     * @memberof LtcTx
     */
    witnessHash: string;
    /**
     * Fee paid for this transaction, in LTC.
     * @type {string}
     * @memberof LtcTx
     */
    fee: string;
    /**
     *
     * @type {string}
     * @memberof LtcTx
     */
    rate: string;
    /**
     *
     * @type {number}
     * @memberof LtcTx
     */
    ps: number;
    /**
     * Height of the block this transaction belongs to.
     * @type {number}
     * @memberof LtcTx
     */
    height: number;
    /**
     * Hash of the block this transaction belongs to.
     * @type {string}
     * @memberof LtcTx
     */
    block: string;
    /**
     * Time of the transaction.
     * @type {number}
     * @memberof LtcTx
     */
    ts: number;
    /**
     * Index of the transaction in the block.
     * @type {number}
     * @memberof LtcTx
     */
    index: number;
    /**
     * Index of the transaction.
     * @type {number}
     * @memberof LtcTx
     */
    version: number;
    /**
     *
     * @type {number}
     * @memberof LtcTx
     */
    flag: number;
    /**
     *
     * @type {Array<LtcTxInputs>}
     * @memberof LtcTx
     */
    inputs: LtcTxInputs[];
    /**
     *
     * @type {Array<LtcTxOutputs>}
     * @memberof LtcTx
     */
    outputs: LtcTxOutputs[];
    /**
     * Block this transaction was included in.
     * @type {number}
     * @memberof LtcTx
     */
    locktime: number;
}
/**
 *
 * @export
 * @interface LtcTxCoin
 */
export interface LtcTxCoin {
    /**
     *
     * @type {number}
     * @memberof LtcTxCoin
     */
    version: number;
    /**
     *
     * @type {number}
     * @memberof LtcTxCoin
     */
    height: number;
    /**
     *
     * @type {string}
     * @memberof LtcTxCoin
     */
    value: string;
    /**
     *
     * @type {string}
     * @memberof LtcTxCoin
     */
    script: string;
    /**
     * Sender address.
     * @type {string}
     * @memberof LtcTxCoin
     */
    address: string;
    /**
     * Coinbase transaction - miner fee.
     * @type {boolean}
     * @memberof LtcTxCoin
     */
    coinbase: boolean;
}
/**
 *
 * @export
 * @interface LtcTxInputs
 */
export interface LtcTxInputs {
    /**
     *
     * @type {LtcTxPrevout}
     * @memberof LtcTxInputs
     */
    prevout: LtcTxPrevout;
    /**
     * Data generated by a spender which is almost always used as variables to satisfy a pubkey script.
     * @type {string}
     * @memberof LtcTxInputs
     */
    script: string;
    /**
     * Transaction witness.
     * @type {string}
     * @memberof LtcTxInputs
     */
    witness: string;
    /**
     *
     * @type {number}
     * @memberof LtcTxInputs
     */
    sequence: number;
    /**
     *
     * @type {LtcTxCoin}
     * @memberof LtcTxInputs
     */
    coin: LtcTxCoin;
}
/**
 *
 * @export
 * @interface LtcTxOutputs
 */
export interface LtcTxOutputs {
    /**
     * Sent amount in LTC.
     * @type {string}
     * @memberof LtcTxOutputs
     */
    value: string;
    /**
     * Transaction script.
     * @type {string}
     * @memberof LtcTxOutputs
     */
    script: string;
    /**
     * Recipient address.
     * @type {string}
     * @memberof LtcTxOutputs
     */
    address: string;
}
/**
 *
 * @export
 * @interface LtcTxPrevout
 */
export interface LtcTxPrevout {
    /**
     * Transaction hash of the input.
     * @type {string}
     * @memberof LtcTxPrevout
     */
    hash: string;
    /**
     * Transaction index of the input.
     * @type {number}
     * @memberof LtcTxPrevout
     */
    index: number;
}
