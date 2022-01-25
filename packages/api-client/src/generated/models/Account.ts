/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountBalance } from './AccountBalance';

export type Account = {
    /**
     * Account ID.
     */
    id: string;
    balance: AccountBalance;
    /**
     * Currency of account.
     */
    currency: string;
    /**
     * Indicates whether account is frozen or not.
     */
    frozen: boolean;
    /**
     * Indicates whether account is active or not.
     */
    active: boolean;
    /**
     * ID of newly created customer or existing customer associated with account.
     */
    customerId?: string;
    /**
     * For bookkeeping to distinct account purpose.
     */
    accountCode?: string;
    /**
     * Account number from external system.
     */
    accountNumber?: string;
    /**
     * Accounting currency of an account.
     */
    accountingCurrency?: string;
    /**
     * Extended public key to generate addresses from.
     */
    xpub?: string;
}
