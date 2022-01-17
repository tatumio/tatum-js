/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OffchainTransactionResult = {
    /**
     * ID of withdrawal. If transaction is not valid in blockchain, use this id to cancel withdrawal.
     */
    id: string;
    /**
     * TX hash of successful transaction.
     */
    txId: string;
    /**
     * Whethet withdrawal was completed in Tatum's internal ledger. If not, it must be done manually.
     */
    completed: boolean;
}
