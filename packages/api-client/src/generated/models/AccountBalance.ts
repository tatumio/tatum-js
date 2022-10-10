/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AccountBalance = {
    /**
     * All assets on the account, both available and blocked
     */
    accountBalance: string;
    /**
     * The account balance minus the blocked assets; use the available balance to determine how much a customer can send or withdraw from their virtual account
     */
    availableBalance: string;
}
