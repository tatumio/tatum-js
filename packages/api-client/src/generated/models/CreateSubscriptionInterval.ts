/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateSubscriptionInterval = {
    /**
     * Type of the subscription.
     */
    type: CreateSubscriptionInterval.type;
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

export namespace CreateSubscriptionInterval {

    /**
     * Type of the subscription.
     */
    export enum type {
        TRANSACTION_HISTORY_REPORT = 'TRANSACTION_HISTORY_REPORT',
    }


}
