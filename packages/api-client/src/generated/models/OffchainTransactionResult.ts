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
     * If set to "true", the withdrawal has been completed in the virtual account; if set to "false", the withdrawal has not been completed and you have to <a href="https://apidoc.tatum.io/tag/Withdrawal#operation/completeWithdrawal" target="_blank">complete it manually</a>
     */
    completed: boolean;
}
