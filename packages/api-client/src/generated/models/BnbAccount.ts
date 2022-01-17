/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BnbAccount = {
    account_number?: number;
    address?: string;
    balances?: Array<{
        free?: string;
        frozen?: string;
        locked?: string;
        symbol?: string;
    }>;
    flags?: number;
    sequence?: number;
}
