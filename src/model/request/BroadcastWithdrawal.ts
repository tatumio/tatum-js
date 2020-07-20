/**
 *
 * @export
 * @interface BroadcastWithdrawal
 */
export interface BroadcastWithdrawal {
    /**
     * Currency of signed transaction to be broadcast, BTC, LTC, BCH, ETH, XRP, ERC20
     * @type {string}
     * @memberof BroadcastWithdrawal
     */
    currency: string;
    /**
     * Raw signed transaction to be published to network.
     * @type {string}
     * @memberof BroadcastWithdrawal
     */
    txData: string;
    /**
     * Withdrawal ID to be completed by transaction broadcast
     * @type {string}
     * @memberof BroadcastWithdrawal
     */
    withdrawalId?: string;
    /**
     * Signature ID to be completed by transaction broadcast
     * @type {string}
     * @memberof BroadcastWithdrawal
     */
    signatureId?: string;
}