/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Subscription = {
    /**
     * Type of the subscription.
     */
    type: 'ACCOUNT_BALANCE_LIMIT' | 'OFFCHAIN_WITHDRAWAL';
    /**
     * ID of the subscription
     */
    id: string;
    /**
     * Additional attributes based on the subscription type.
     */
    attr?: any;
}
