import { Network } from '../../service'
import { UtxoE2eUtils } from './utxo.e2e.utils'

describe('Litecoin', () => {
  describe('testnet', () => {
    UtxoE2eUtils.e2e({ network: Network.LITECOIN_TESTNET, type: 'test' })
  })

  describe('mainnet', () => {
    UtxoE2eUtils.e2e({ network: Network.LITECOIN, type: 'main' })
  })
})
