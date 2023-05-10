import { Network } from '../../service'
import { EvmE2eUtils } from './evm.e2e.utils'

describe('Ethereum', () => {
  describe('mainnet', () => {
    EvmE2eUtils.e2e({ network: Network.ETHEREUM, chainId: 1 })
  })

  describe('sepolia', () => {
    EvmE2eUtils.e2e({ network: Network.ETHEREUM_SEPOLIA, chainId: 11155111 })
  })
})
