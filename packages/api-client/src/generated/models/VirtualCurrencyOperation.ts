/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type VirtualCurrencyOperation = {
    /**
     * Ledger account with currency of the virtual currency, on which the operation will be performed.
     */
    accountId: string;
    /**
     * Amount of virtual currency to operate within this operation.
     */
    amount: string;
    /**
     * Identifier of the payment, shown for created Transaction within Tatum sender account.
     */
    paymentId?: string;
    /**
     * Reference of the payment.
     */
    reference?: string;
    /**
     * For bookkeeping to distinct transaction purpose.
     */
    transactionCode?: string;
    /**
     * Note visible to both, sender and recipient. Available for both Mint and Revoke operations
     */
    recipientNote?: string;
    /**
     * External account identifier. By default, there is no counterAccount present in the transaction.
     */
    counterAccount?: string;
    /**
     * Note visible to sender. Available in Revoke operation.
     */
    senderNote?: string;
}
