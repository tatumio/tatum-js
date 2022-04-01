/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TerraAccount = {
    accountNumber?: number;
    address?: string;
    assets?: Array<{
        balance?: string;
        asset?: string;
    }>;
    sequence?: number;
}
