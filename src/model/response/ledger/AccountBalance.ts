/**
 *
 * @export
 * @interface AccountBalance
 */
export interface AccountBalance {
    /**
     * Account balance represents all assets on the account, available and blocked.
     * @type {string}
     * @memberof AccountBalance
     */
    accountBalance: string;
    /**
     * Available balance on the account represents account balance minus blocked amount on the account.
     * If the account is frozen or customer is disabled, the available balance will be 0.
     * Available balance should be user do determine how much can customer send or withdraw from the account.
     * @type {string}
     * @memberof AccountBalance
     */
    availableBalance: string;
}