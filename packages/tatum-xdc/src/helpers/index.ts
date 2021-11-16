import { Currency } from '@tatumio/tatum-core'
import Web3 from 'web3'
import { getXdcClient } from '../transaction'

export const helperGetWeb3Client = (testnet: boolean, chain: Currency, provider?: string): Web3 => {
  return getXdcClient(provider)
}
