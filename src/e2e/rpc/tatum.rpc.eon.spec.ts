import { Network } from '../../dto'
import { EvmE2eUtils } from './evm.e2e.utils'

describe('Eon', () => {
  describe('mainnet', () => {
    EvmE2eUtils.e2e({ network: Network.EON, chainId: 137 })
  })
})
