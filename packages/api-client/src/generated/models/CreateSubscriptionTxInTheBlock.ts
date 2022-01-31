/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateSubscriptionTxInTheBlock = {
    /**
     * Type of the subscription.
     */
    type: 'TRANSACTION_IN_THE_BLOCK';
    /**
     * Additional attributes based on the subscription type.
     */
    attr: {
        /**
         * URL of the endpoint, where HTTP POST request will be sent, when outgoing ledger transaction is included in the block.
         */
        url: string;
    };
}
