/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateSubscriptionIncoming = {
    /**
     * Type of the subscription.
     */
    type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION';
    /**
     * Additional attributes based on the subscription type.
     */
    attr: {
        /**
         * ID of the account, on which the webhook will be applied, when new incoming blockchain transaction will be credited.
         */
        id: string;
        /**
         * URL of the endpoint, where HTTP POST request will be sent, when new incoming blockchain transaction will be credited.
         */
        url: string;
    };
}
