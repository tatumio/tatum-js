/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountBalance } from './AccountBalance';

export type Account = {
    /**
     * The ID of the virtual account
     */
    id: string;
    balance: AccountBalance;
    /**
     * The currency of the virtual account
     */
    currency: string;
    /**
     * If set to "true", the virtual account is frozen
     */
    frozen: boolean;
    /**
     * If set to "true", the virtual account is active
     */
    active: boolean;
    /**
     * The ID of the customer (newly created or existing one) associated with the virtual account
     */
    customerId?: string;
    /**
     * The number associated with the virtual account in an external system
     */
    accountNumber?: string;
    /**
     * The code associated with the virtual account in an external system to designate the purpose of the account in bookkeeping
     */
    accountCode?: string;
    /**
     * The currency in which all the transactions for all accounts will be accounted
     */
    accountingCurrency?: string;
    /**
     * The extended public key of the blockchain wallet associated with the virtual account; used to generate deposit addresses for the virtual account
     */
    xpub?: string;
}
