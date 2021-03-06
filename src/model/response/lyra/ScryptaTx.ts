/**
 *
 * @export
 * @interface ScryptaTx
 */
export interface ScryptaTx {
    /**
     * Transaction hash.
     * @type {string}
     * @memberof ScryptaTx
     */
    hash: string;
    /**
     * Witness hash in case of a SegWit transaction.
     * @type {string}
     * @memberof ScryptaTx
     */
    witnessHash: string;
    /**
     * Fee paid for this transaction, in satoshis.
     * @type {number}
     * @memberof ScryptaTx
     */
    fee: number;
    /**
     *
     * @type {number}
     * @memberof ScryptaTx
     */
    rate: number;
    /**
     *
     * @type {number}
     * @memberof ScryptaTx
     */
    mtime: number;
    /**
     * Height of the block this transaction belongs to.
     * @type {number}
     * @memberof ScryptaTx
     */
    height: number;
    /**
     * Hash of the block this transaction belongs to.
     * @type {string}
     * @memberof ScryptaTx
     */
    block: string;
    /**
     * Time of the transaction.
     * @type {number}
     * @memberof ScryptaTx
     */
    time: number;
    /**
     * Index of the transaction in the block.
     * @type {number}
     * @memberof ScryptaTx
     */
    index: number;
    /**
     * Index of the transaction.
     * @type {number}
     * @memberof ScryptaTx
     */
    version: number;
    /**
     *
     * @type {Array<ScryptaTxInputs>}
     * @memberof ScryptaTx
     */
    inputs: ScryptaTxInputs[];
    /**
     *
     * @type {Array<ScryptaTxOutputs>}
     * @memberof ScryptaTx
     */
    outputs: ScryptaTxOutputs[];
    /**
     * Block this transaction was included in.
     * @type {number}
     * @memberof ScryptaTx
     */
    locktime: number;
}

/**
 *
 * @export
 * @interface ScryptaTxCoin
 */
export interface ScryptaTxCoin {
    /**
     *
     * @type {number}
     * @memberof ScryptaTxCoin
     */
    version: number;
    /**
     *
     * @type {number}
     * @memberof ScryptaTxCoin
     */
    height: number;
    /**
     *
     * @type {number}
     * @memberof ScryptaTxCoin
     */
    value: number;
    /**
     *
     * @type {string}
     * @memberof ScryptaTxCoin
     */
    script: string;
    /**
     * Sender address.
     * @type {string}
     * @memberof ScryptaTxCoin
     */
    address: string;
    /**
     * Coinbase transaction - miner fee.
     * @type {boolean}
     * @memberof ScryptaTxCoin
     */
    coinbase: boolean;
}

/**
 *
 * @export
 * @interface ScryptaTxInputs
 */
export interface ScryptaTxInputs {
    /**
     *
     * @type {ScryptaTxPrevout}
     * @memberof ScryptaTxInputs
     */
    prevout: ScryptaTxPrevout;
    /**
     * Data generated by a spender which is almost always used as variables to satisfy a pubkey script.
     * @type {string}
     * @memberof ScryptaTxInputs
     */
    script: string;
    /**
     * Transaction witness.
     * @type {string}
     * @memberof ScryptaTxInputs
     */
    witness: string;
    /**
     *
     * @type {number}
     * @memberof ScryptaTxInputs
     */
    sequence: number;
    /**
     *
     * @type {ScryptaTxCoin}
     * @memberof ScryptaTxInputs
     */
    coin: ScryptaTxCoin;
}

/**
 *
 * @export
 * @interface ScryptaTxOutputs
 */
export interface ScryptaTxOutputs {
    /**
     * Sent amount in satoshis.
     * @type {number}
     * @memberof ScryptaTxOutputs
     */
    value: number;
    /**
     * Transaction script.
     * @type {string}
     * @memberof ScryptaTxOutputs
     */
    script: string;
    /**
     * Recipient address.
     * @type {string}
     * @memberof ScryptaTxOutputs
     */
    address: string;
}

/**
 *
 * @export
 * @interface ScryptaTxPrevout
 */
export interface ScryptaTxPrevout {
    /**
     * Transaction hash of the input.
     * @type {string}
     * @memberof ScryptaTxPrevout
     */
    hash: string;
    /**
     * Transaction index of the input.
     * @type {number}
     * @memberof ScryptaTxPrevout
     */
    index: number;
}