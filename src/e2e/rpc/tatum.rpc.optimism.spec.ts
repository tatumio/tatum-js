import { Network } from '../../service'
import { EvmE2eUtils } from './evm.e2e.utils'

describe('Optimism', () => {
  describe('mainnet', () => {
    EvmE2eUtils.e2e({ network: Network.OPTIMISM, chainId: 10 })
  })
})
