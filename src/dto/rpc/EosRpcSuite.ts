/* eslint-disable @typescript-eslint/no-explicit-any */
import { BigNumber } from 'bignumber.js'
import { AbstractRpcInterface } from './AbstractJsonRpcInterface'

interface GetProducersI {
  json?: boolean
  lowerBound?: string
  limit?: number
}

// Definition for Action
interface Action {
  account: 'NamePrivileged' | 'NameBasic' | 'NameBid' | 'NameCatchAll'
  name: 'NamePrivileged' | 'NameBasic' | 'NameBid' | 'NameCatchAll'
  authorization: Authority[]
  data: object
  hexData: string
}

// Definition for Authority
interface Authority {
  // Fill in the fields for Authority based on your needs
}

// Definition for Extension
type Extension = Array<number | string>

// Main Transaction interface
interface TransactionI {
  expiration: string // DateTime in string format
  refBlockNum: number
  refBlockPrefix: number
  maxNetUsageWords: string | number // WholeNumber
  maxCpuUsageMs: string | number // WholeNumber
  delaySec: number
  contextFreeActions: Action[]
  actions: Action[]
  transactionExtensions: Extension[]
}

interface GetRequiredKeysI {
  transaction: TransactionI
  availableKeys: string[]
}

export interface EosRpcSuite extends AbstractRpcInterface {
  /**
   * Validates a Tron address.
   *
   * @param {string} address - The Tron address to be validated.
   * @param {VisibleOption} [options] - The options for validation.
   * @returns {Promise<any>} - Returns a Promise that resolves with validation result.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-address-utility-methods/validateaddress
   */
  validateAddress(address: string, options?: VisibleOption): Promise<any>

  /**
   * Broadcasts a raw Tron transaction.
   *
   * @param {TronTxRawBody} rawBody - The raw body of the transaction to be broadcasted.
   * @returns {Promise<any>} - Returns a Promise that resolves with the broadcast result.
   * https://docs.tatum.com/docs/rpc-api-reference/tron-rpc-documentation/api-calls-for-transaction-methods/broadcasttransaction
   */
  broadcastTransaction(rawBody: TronTxRawBody): Promise<any>

  getProducers(body: GetProducersI): Promise<any>
}
