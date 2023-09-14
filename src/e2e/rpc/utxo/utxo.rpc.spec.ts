import { Network } from '../../../service'
import { UtxoE2eUtils, UtxoNetworkType } from './utxo.e2e.utils'

const utxoTestNetworks = [
  { network: Network.BITCOIN_TESTNET, type: UtxoNetworkType.TEST },
  { network: Network.BITCOIN, type: UtxoNetworkType.MAIN },
  { network: Network.DOGECOIN_TESTNET, type: UtxoNetworkType.TEST },
  { network: Network.DOGECOIN, type: UtxoNetworkType.MAIN },
  { network: Network.LITECOIN_TESTNET, type: UtxoNetworkType.TEST },
  { network: Network.LITECOIN, type: UtxoNetworkType.MAIN },
]

describe.each(utxoTestNetworks)('UTXO E2E Test Suite', (testNetwork) => {
  const { network, type } = testNetwork

  describe(network, () => {
    UtxoE2eUtils.e2e({ network, type })
  })
})
