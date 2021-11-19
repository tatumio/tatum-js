import Web3 from 'web3'
import { getXdcClient } from '../transaction'

export const helperGetWeb3Client = (provider?: string): Web3 => {
  return getXdcClient(provider)
}
