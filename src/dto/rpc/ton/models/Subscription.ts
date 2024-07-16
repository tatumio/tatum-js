/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Subscription = {
    address: string;
    wallet_address: string;
    beneficiary_address: string;
    amount: number;
    period: number;
    start_time: number;
    timeout: number;
    last_payment_time: number;
    last_request_time: number;
    subscription_id: number;
    failed_attempts: number;
};
