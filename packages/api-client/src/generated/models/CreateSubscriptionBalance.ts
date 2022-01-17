/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateSubscriptionBalance = {
    /**
     * Type of the subscription.
     */
    type: CreateSubscriptionBalance.type;
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
        typeOfBalance: CreateSubscriptionBalance.typeOfBalance;
    };
}

export namespace CreateSubscriptionBalance {

    /**
     * Type of the subscription.
     */
    export enum type {
        ACCOUNT_BALANCE_LIMIT = 'ACCOUNT_BALANCE_LIMIT',
    }

    /**
     * Type of balance to filter.
     */
    export enum typeOfBalance {
        ACCOUNT = 'account',
        AVAILABLE = 'available',
    }


}
