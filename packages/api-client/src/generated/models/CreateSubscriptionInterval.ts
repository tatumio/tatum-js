/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateSubscriptionInterval = {
    /**
     * Type of the subscription.
     */
    type: 'TRANSACTION_HISTORY_REPORT';
    /**
     * Additional attributes based on the subscription type.
     */
    attr: {
        /**
         * Number of hours to obtain transactions for.
         */
        interval: number;
    };
}
