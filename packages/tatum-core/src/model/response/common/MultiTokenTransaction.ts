import { TransactionHash } from '.'

/**
 * MultiTokenTransaction
 */
export interface MultiTokenTransaction extends TransactionHash {
  /**
   * Block number.
   * @type {number}
   * @memberof MultiTokenTransaction
   */
  blockNumber: number
  /**
   * Contract address.
   * @type {string}
   * @memberof MultiTokenTransaction
   */
  contractAddress: string
  /**
   * ID of the token.
   * @type {string}
   * @memberof MultiTokenTransaction
   */
  tokenId: string
  /**
   * Amount of tokens transferred..
   * @type {string}
   * @memberof MultiTokenTransaction
   */
  amount: string
  /**
   * Sender.
   * @type {string}
   * @memberof MultiTokenTransaction
   */
  from: string
  /**
   * Operator.
   * @type {string}
   * @memberof MultiTokenTransaction
   */
  operator: string
  /**
   * Recipient.
   * @type {string}
   * @memberof MultiTokenTransaction
   */
  to: string
}
