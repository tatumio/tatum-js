/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferXlmBlockchain = {
  /**
   * @TODO OPENAPI BUG
   * Blockchain account to send assets from
   */
  fromAccount?: string
  /**
   * Blockchain address to send assets
   */
  to: string
  /**
   * Amount to be sent, in XLM.
   */
  amount: string
  /**
   * Secret for account. Secret, or signature Id must be present.
   */
  fromSecret: string
  /**
   * Set to true, if the destination address is not yet initialized and should be funded for the first time.
   */
  initialize?: boolean
  /**
   * Short message to recipient. It can be either 28 characters long ASCII text, 64 characters long HEX string or uint64 number.
   */
  message?: string
}
