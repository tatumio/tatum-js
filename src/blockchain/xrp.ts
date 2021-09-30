import { get, post } from '../connector/tatum'
import {TransactionHash} from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetFee" target="_blank">Tatum API documentation</a>
 */
export const xrpGetFee = async (): Promise<{ drops: { base_fee: number } }> => get(`/v3/xrp/fee`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetAccountInfo" target="_blank">Tatum API documentation</a>
 */
export const xrpGetAccountInfo = async (account: string): Promise<{ ledger_current_index: number, account_data: { Sequence: number } }> =>
  get(`/v3/xrp/account/${account}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpBroadcast" target="_blank">Tatum API documentation</a>
 */
export const xrpBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/xrp/broadcast`, { txData, signatureId })

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetLastClosedLedger" target="_blank">Tatum API documentation</a>
 */
export const xrpGetCurrentLedger = async (): Promise<number> => get(`/v3/xrp/info`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetLedger" target="_blank">Tatum API documentation</a>
 */
export const xrpGetLedger = async (i: number) => get(`/v3/xrp/ledger/${i}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetAccountBalance" target="_blank">Tatum API documentation</a>
 */
export const xrpGetAccountBalance = async (address: string) => get(`/v3/xrp/account/${address}/balance`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const xrpGetTransaction = async (hash: string) => get(`/v3/xrp/transaction/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetAccountTx" target="_blank">Tatum API documentation</a>
 */
export const xrpGetAccountTransactions = async (address: string, min?: number, marker?: string) =>
  get(`/v3/xrp/account/tx/${address}${min ? `?min=${min}${marker ? `&marker=${marker}` : ''}` : marker ? `?marker=${marker}` : ''}`)