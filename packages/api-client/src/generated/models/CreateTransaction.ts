/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateTransaction = {
    /**
     * Internal sender account ID within Tatum platform
     */
    senderAccountId: string;
    /**
     * Internal recipient account ID within Tatum platform
     */
    recipientAccountId: string;
    /**
     * Amount to be sent.
     */
    amount: string;
    /**
     * Anonymous transaction does not show sender account to recipient, default is false
     */
    anonymous?: boolean;
    /**
     * Enable compliant checks. Transaction will not be processed, if compliant check fails.
     */
    compliant?: boolean;
    /**
     * For bookkeeping to distinct transaction purpose.
     */
    transactionCode?: string;
    /**
     * Payment ID, External identifier of the payment, which can be used to pair transactions within Tatum accounts.
     */
    paymentId?: string;
    /**
     * Note visible to both, sender and recipient
     */
    recipientNote?: string;
    /**
     * Exchange rate of the base pair. Only applicable for Tatum's Virtual currencies Ledger transactions. Override default exchange rate for the Virtual Currency.
     */
    baseRate?: number;
    /**
     * Note visible to sender
     */
    senderNote?: string;
}
