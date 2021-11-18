import { Currency } from '@tatumio/tatum-core'
import { TransferTron } from '../model'

/**
 * Perform any native asset transaction.
 * @param body Body of the transaction.
 */
export const sendTransaction = async (body: TransferTron) => {
  // @ts-ignore
  if (body.contractAddress) {
    throw new Error('Cannot work with TRON and contract address')
  }
}
