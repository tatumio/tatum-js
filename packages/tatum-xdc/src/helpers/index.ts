import Web3 from 'web3'
import { getClient } from '../transaction'

export const helperGetWeb3Client = (provider?: string): Web3 => {
  return getClient(provider)
}
