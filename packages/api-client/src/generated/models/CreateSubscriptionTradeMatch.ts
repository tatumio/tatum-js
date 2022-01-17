/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateSubscriptionTradeMatch = {
    /**
     * Type of the subscription.
     */
    type: CreateSubscriptionTradeMatch.type;
    /**
     * Additional attributes based on the subscription type.
     */
    attr: {
        /**
         * ID of the customer, on which the webhook will be applied, when on any of his accounts trade will be matched and closed.
         */
        id: string;
        /**
         * URL of the endpoint, where HTTP POST request will be sent, when on any of his accounts trade will be matched and closed.
         */
        url: string;
    };
}

export namespace CreateSubscriptionTradeMatch {

    /**
     * Type of the subscription.
     */
    export enum type {
        CUSTOMER_TRADE_MATCH = 'CUSTOMER_TRADE_MATCH',
    }


}
