/**
 * NftTransaction
 */
export interface NftTransaction {
  /**
   * Block number.
   * @type {number}
   * @memberof NftTransaction
   */
  blockNumber: number
  /**
   * Transaction ID.
   * @type {string}
   * @memberof NftTransaction
   */
  txId: string
  /**
   * Contract address.
   * @type {string}
   * @memberof NftTransaction
   */
  contractAddress: string
  /**
   * ID of the token.
   * @type {string}
   * @memberof NftTransaction
   */
  tokenId: string
  /**
   * Sender.
   * @type {string}
   * @memberof NftTransaction
   */
  from: string
  /**
   * Recipient.
   * @type {string}
   * @memberof NftTransaction
   */
  to: string
}
