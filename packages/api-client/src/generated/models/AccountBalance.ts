/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AccountBalance = {
    /**
     * Account balance represents all assets on the account, available and blocked.
     */
    accountBalance: string;
    /**
     * Available balance on the account represents account balance minus blocked amount on the account. Available balance should be user do determine how much can customer send or withdraw from the account.
     */
    availableBalance: string;
}
