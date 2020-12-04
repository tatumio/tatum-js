/**
 *
 * @export
 * @interface VetTxReceipt
 */
export interface VetTxReceipt {
    /**
     *
     * @type {number}
     * @memberof VetTxReceipt
     */
    gasUsed: number;
    /**
     *
     * @type {string}
     * @memberof VetTxReceipt
     */
    gasPayer: string;
    /**
     *
     * @type {string}
     * @memberof VetTxReceipt
     */
    paid: string;
    /**
     *
     * @type {string}
     * @memberof VetTxReceipt
     */
    reward: string;
    /**
     *
     * @type {boolean}
     * @memberof VetTxReceipt
     */
    reverted: boolean;
    /**
     *
     * @type {VetTxReceiptMeta}
     * @memberof VetTxReceipt
     */
    meta: VetTxReceiptMeta;
    /**
     *
     * @type {Array<VetTxReceiptOutputs>}
     * @memberof VetTxReceipt
     */
    outputs: VetTxReceiptOutputs[];
    /**
     *
     * @type {number}
     * @memberof VetTxReceipt
     */
    blockNumber: number;
    /**
     *
     * @type {string}
     * @memberof VetTxReceipt
     */
    blockHash: string;
    /**
     *
     * @type {string}
     * @memberof VetTxReceipt
     */
    transactionHash: string;
    /**
     *
     * @type {string}
     * @memberof VetTxReceipt
     */
    status: string;
}
/**
 *
 * @export
 * @interface VetTxReceiptMeta
 */
export interface VetTxReceiptMeta {
    /**
     *
     * @type {string}
     * @memberof VetTxReceiptMeta
     */
    blockID: string;
    /**
     *
     * @type {number}
     * @memberof VetTxReceiptMeta
     */
    blockNumber: number;
    /**
     *
     * @type {number}
     * @memberof VetTxReceiptMeta
     */
    blockTimestamp: number;
    /**
     *
     * @type {string}
     * @memberof VetTxReceiptMeta
     */
    txID: string;
    /**
     *
     * @type {string}
     * @memberof VetTxReceiptMeta
     */
    txOrigin: string;
}
/**
 *
 * @export
 * @interface VetTxReceiptOutputs
 */
export interface VetTxReceiptOutputs {
    /**
     *
     * @type {Array<any>}
     * @memberof VetTxReceiptOutputs
     */
    events: any[];
    /**
     *
     * @type {Array<VetTxReceiptTransfers>}
     * @memberof VetTxReceiptOutputs
     */
    transfers: VetTxReceiptTransfers[];
}
/**
 *
 * @export
 * @interface VetTxReceiptTransfers
 */
export interface VetTxReceiptTransfers {
    /**
     *
     * @type {string}
     * @memberof VetTxReceiptTransfers
     */
    sender: string;
    /**
     *
     * @type {string}
     * @memberof VetTxReceiptTransfers
     */
    recipient: string;
    /**
     *
     * @type {string}
     * @memberof VetTxReceiptTransfers
     */
    amount: string;
}
