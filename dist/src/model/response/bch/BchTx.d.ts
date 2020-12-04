/**
 *
 * @export
 * @interface BchTx
 */
export interface BchTx {
    /**
     *
     * @type {string}
     * @memberof BchTx
     */
    txid: string;
    /**
     *
     * @type {number}
     * @memberof BchTx
     */
    version: number;
    /**
     *
     * @type {number}
     * @memberof BchTx
     */
    locktime: number;
    /**
     *
     * @type {Array<BchTxVin>}
     * @memberof BchTx
     */
    vin: BchTxVin[];
    /**
     *
     * @type {Array<BchTxVout>}
     * @memberof BchTx
     */
    vout: BchTxVout[];
}
/**
 *
 * @export
 * @interface BchTxScriptPubKey
 */
export interface BchTxScriptPubKey {
    /**
     *
     * @type {string}
     * @memberof BchTxScriptPubKey
     */
    hex: string;
    /**
     *
     * @type {string}
     * @memberof BchTxScriptPubKey
     */
    asm: string;
    /**
     *
     * @type {Array<string>}
     * @memberof BchTxScriptPubKey
     */
    addresses: string[];
    /**
     *
     * @type {string}
     * @memberof BchTxScriptPubKey
     */
    type: string;
}
/**
 *
 * @export
 * @interface BchTxScriptSig
 */
export interface BchTxScriptSig {
    /**
     *
     * @type {string}
     * @memberof BchTxScriptSig
     */
    hex: string;
    /**
     *
     * @type {string}
     * @memberof BchTxScriptSig
     */
    asm: string;
}
/**
 *
 * @export
 * @interface BchTxVin
 */
export interface BchTxVin {
    /**
     *
     * @type {string}
     * @memberof BchTxVin
     */
    txid: string;
    /**
     *
     * @type {number}
     * @memberof BchTxVin
     */
    vout: number;
    /**
     *
     * @type {BchTxScriptSig}
     * @memberof BchTxVin
     */
    scriptSig: BchTxScriptSig;
    /**
     *
     * @type {string}
     * @memberof BchTxVin
     */
    coinbase: string;
    /**
     *
     * @type {number}
     * @memberof BchTxVin
     */
    sequence: number;
}
/**
 *
 * @export
 * @interface BchTxVout
 */
export interface BchTxVout {
    /**
     *
     * @type {string}
     * @memberof BchTxVout
     */
    value: string;
    /**
     *
     * @type {number}
     * @memberof BchTxVout
     */
    n: number;
    /**
     *
     * @type {BchTxScriptPubKey}
     * @memberof BchTxVout
     */
    scriptPubKey: BchTxScriptPubKey;
}
