/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';

/**
 * Object containing information about balance of Ethereum funds on each address linked to the account, from which withdrawal should be processed.
 */
export type WithdrawalHint = Record<string, {
    address?: Address;
    /**
     * Balance for address.
     */
    amount?: string;
}>;