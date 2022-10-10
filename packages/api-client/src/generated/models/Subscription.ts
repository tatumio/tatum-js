/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Subscription = {
    /**
     * Type of the subscription.
     */
    type: 'ADDRESS_TRANSACTION' | 'CONTRACT_LOG_EVENT' | 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION' | 'ACCOUNT_PENDING_BLOCKCHAIN_TRANSACTION' | 'CUSTOMER_TRADE_MATCH' | 'CUSTOMER_PARTIAL_TRADE_MATCH' | 'TRANSACTION_IN_THE_BLOCK' | 'KMS_FAILED_TX' | 'KMS_COMPLETED_TX' | 'ACCOUNT_BALANCE_LIMIT' | 'TRANSACTION_HISTORY_REPORT';
    /**
     * ID of the subscription
     */
    id: string;
    /**
     * Additional attributes based on the subscription type.
     */
    attr?: any;
}
