/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateSubscriptionPending = {
    /**
     * Type of the subscription.
     */
    type: 'ACCOUNT_PENDING_BLOCKCHAIN_TRANSACTION';
    /**
     * Additional attributes based on the subscription type.
     */
    attr: {
        /**
         * ID of the account, on which the webhook will be applied, when new incoming pending blockchain transaction with 0 confirmations will be credited.
         */
        id: string;
        /**
         * URL of the endpoint, where HTTP POST request will be sent, when new incoming pending blockchain transaction with 0 confirmations will be credited.
         */
        url: string;
    };
}
