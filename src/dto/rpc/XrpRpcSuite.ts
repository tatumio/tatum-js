/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractJsonRpcSuite } from './AbstractJsonRpcSuite'

/**
 * XRP RPC calls.
 */

export type LedgerIndex = 'validated' | number

export interface XrpRpcSuite extends AbstractJsonRpcSuite {
  // account methods
  accountChannels(account: string, destinationAccount: string, ledgerIndex: LedgerIndex): Promise<any>
}
