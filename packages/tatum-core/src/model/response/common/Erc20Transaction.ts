import { TransactionHash } from '.'

/**
 * Erc20Transaction
 */
export interface Erc20Transaction extends TransactionHash {
  /**
   * Block number.
   * @type {number}
   * @memberof Erc20Transaction
   */
  blockNumber: number
  /**
   * Contract address.
   * @type {string}
   * @memberof Erc20Transaction
   */
  contractAddress: string
  /**
   * Amount of tokens transferred, in smallest decimals.
   * @type {string}
   * @memberof Erc20Transaction
   */
  amount: string
  /**
   * Sender.
   * @type {string}
   * @memberof Erc20Transaction
   */
  from: string
  /**
   * Recipient.
   * @type {string}
   * @memberof Erc20Transaction
   */
  to: string
}
