import { Network } from '../../service'
import { EvmE2eUtils } from './evm.e2e.utils'

describe('Haqq', () => {
  describe('mainnet', () => {
    EvmE2eUtils.e2e({ network: Network.HAQQ, chainId: 11235 })
  })

  describe('testnet', () => {
    EvmE2eUtils.e2e({ network: Network.HAQQ_TESTNET, chainId: 54211 })
  })
})
