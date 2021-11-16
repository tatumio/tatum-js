import { Currency } from '@tatumio/tatum-core'
import { TransferTron } from '../model'

/**
 * Perform any native asset transaction.
 * @param testnet if we are on testnet or not
 * @param chain Blockchain to work with. ETH,CELO,MATIC,ONE,TRON,BSC supported now.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const sendTransaction = async (testnet: boolean, chain: Currency, body: TransferTron, provider?: string) => {
  // @ts-ignore
  if (body.contractAddress) {
    throw new Error('Cannot work with TRON and contract address')
  }
}
