/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateSubscriptionBalance = {
    /**
     * Type of the subscription.
     */
    type: 'ACCOUNT_BALANCE_LIMIT';
    /**
     * Additional attributes based on the subscription type.
     */
    attr: {
        /**
         * Limit to filter accounts with balance above it.
         */
        limit: string;
        /**
         * Type of balance to filter.
         */
        typeOfBalance: 'account' | 'available';
    };
}
