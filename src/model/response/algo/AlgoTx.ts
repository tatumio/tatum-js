/**
 *
 * @export
 * @interface AlgoTx
 */
export interface AlgoTx {
    /**
     * Transaction hash.
     * @type {string}
     * @memberof AlgoTx
     */
    hash: string;
    /**
     * Witness hash in case of a SegWit transaction.
     * @type {string}
     * @memberof BtcTx
     */
    witnessHash: string;
    /**
     * Fee paid for this transaction, in satoshis.
     * @type {number}
     * @memberof BtcTx
     */
    fee: number;
    /**
     *
     * @type {number}
     * @memberof BtcTx
     */
    rate: number;
    /**
     *
     * @type {number}
     * @memberof BtcTx
     */
    mtime: number;
    /**
     * Height of the block this transaction belongs to.
     * @type {number}
     * @memberof BtcTx
     */
    height: number;
    /**
     * Hash of the block this transaction belongs to.
     * @type {string}
     * @memberof BtcTx
     */
    block: string;
    /**
     * Time of the transaction.
     * @type {number}
     * @memberof BtcTx
     */
    time: number;
    /**
     * Index of the transaction in the block.
     * @type {number}
     * @memberof BtcTx
     */
    index: number;
    /**
     * Index of the transaction.
     * @type {number}
     * @memberof BtcTx
     */
    version: number;
    /**
     *
     * @type {Array<BtcTxInputs>}
     * @memberof BtcTx
     */
    inputs?: BtcTxInputs[];
    /**
     *
     * @type {Array<BtcTxOutputs>}
     * @memberof BtcTx
     */
    outputs?: BtcTxOutputs[];

    vin?: {
        txid: string,
        vout: number,
    }[];

    vout?: {
        value: number,
        n: number,
        scriptPubKey: {
            addresses: string[]
        }
    }[];
    /**
     * Block this transaction was included in.
     * @type {number}
     * @memberof BtcTx
     */
    locktime: number;
}