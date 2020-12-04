/**
 *
 * @export
 * @interface TxHash
 */
export interface TxHash {
    /**
     * TX hash of successful transaction.
     * @type {string}
     * @memberof TxHash
     */
    txId: string;
    /**
     * Whethet withdrawal was completed in Tatum's internal ledger. If not, it must be done manually.
     * @type {boolean}
     * @memberof TxHash
     */
    completed: boolean;
}
