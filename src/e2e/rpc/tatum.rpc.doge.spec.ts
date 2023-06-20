import { Network } from '../../service'
import { UtxoE2eUtils } from './utxo.e2e.utils'

describe('Doge', () => {
  describe('testnet', () => {
    UtxoE2eUtils.e2e({ network: Network.DOGECOIN_TESTNET, type: 'test' })
  })

  describe('mainnet', () => {
    UtxoE2eUtils.e2e({ network: Network.DOGECOIN, type: 'main' })
  })
})
