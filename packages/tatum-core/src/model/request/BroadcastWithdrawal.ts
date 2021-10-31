/**
 *
 * @export
 * @interface BroadcastWithdrawal
 */
export class BroadcastWithdrawal {
  /**
   * Currency of signed transaction to be broadcast, BTC, LTC, BCH, ETH, XRP, ERC20
   * @type {string}
   * @memberof BroadcastWithdrawal
   */
  public currency: string
  /**
   * Raw signed transaction to be published to network.
   * @type {string}
   * @memberof BroadcastWithdrawal
   */
  public txData: string
  /**
   * Withdrawal ID to be completed by transaction broadcast
   * @type {string}
   * @memberof BroadcastWithdrawal
   */
  public withdrawalId?: string
  /**
   * Signature ID to be completed by transaction broadcast
   * @type {string}
   * @memberof BroadcastWithdrawal
   */
  public signatureId?: string
}
