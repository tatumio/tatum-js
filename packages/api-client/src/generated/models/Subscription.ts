/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Subscription = {
    /**
     * Type of the subscription.
     */
    type: Subscription.type;
    /**
     * ID of the subscription
     */
    id: string;
    /**
     * Additional attributes based on the subscription type.
     */
    attr?: any;
}

export namespace Subscription {

    /**
     * Type of the subscription.
     */
    export enum type {
        ACCOUNT_BALANCE_LIMIT = 'ACCOUNT_BALANCE_LIMIT',
        OFFCHAIN_WITHDRAWAL = 'OFFCHAIN_WITHDRAWAL',
    }


}
