/**
 *
 * @export
 * @interface VetTx
 */
export interface VetTx {
    /**
     *
     * @type {string}
     * @memberof VetTx
     */
    id: string;
    /**
     *
     * @type {string}
     * @memberof VetTx
     */
    chainTag: string;
    /**
     *
     * @type {string}
     * @memberof VetTx
     */
    blockRef: string;
    /**
     *
     * @type {number}
     * @memberof VetTx
     */
    expiration: number;
    /**
     *
     * @type {Array<VetTxClauses>}
     * @memberof VetTx
     */
    clauses: VetTxClauses[];
    /**
     *
     * @type {number}
     * @memberof VetTx
     */
    gasPriceCoef: number;
    /**
     *
     * @type {number}
     * @memberof VetTx
     */
    gas: number;
    /**
     *
     * @type {string}
     * @memberof VetTx
     */
    origin: string;
    /**
     *
     * @type {string}
     * @memberof VetTx
     */
    nonce: string;
    /**
     *
     * @type {number}
     * @memberof VetTx
     */
    size: number;
    /**
     *
     * @type {VetTxMeta}
     * @memberof VetTx
     */
    meta: VetTxMeta;
    /**
     *
     * @type {number}
     * @memberof VetTx
     */
    blockNumber: number;
}
/**
 *
 * @export
 * @interface VetTxClauses
 */
export interface VetTxClauses {
    /**
     *
     * @type {string}
     * @memberof VetTxClauses
     */
    to: string;
    /**
     *
     * @type {string}
     * @memberof VetTxClauses
     */
    value: string;
    /**
     *
     * @type {string}
     * @memberof VetTxClauses
     */
    data: string;
}
/**
 *
 * @export
 * @interface VetTxMeta
 */
export interface VetTxMeta {
    /**
     *
     * @type {string}
     * @memberof VetTxMeta
     */
    blockID: string;
    /**
     *
     * @type {number}
     * @memberof VetTxMeta
     */
    blockNumber: number;
    /**
     *
     * @type {number}
     * @memberof VetTxMeta
     */
    blockTimestamp: number;
}
