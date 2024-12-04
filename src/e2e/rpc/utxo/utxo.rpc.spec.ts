import { Network } from '../../../service'
import { ApiKey } from '../../e2e.constant'
import { UtxoE2eUtils, UtxoNetworkType } from './utxo.e2e.utils'

const utxoTestNetworks = [
  { network: Network.BITCOIN_TESTNET, type: UtxoNetworkType.TEST },
  { network: Network.BITCOIN_TESTNET_4, type: UtxoNetworkType.TESTNET4 },
  { network: Network.BITCOIN, type: UtxoNetworkType.MAIN },
  { network: Network.DOGECOIN_TESTNET, type: UtxoNetworkType.TEST },
  { network: Network.DOGECOIN, type: UtxoNetworkType.MAIN },
  { network: Network.LITECOIN_TESTNET, type: UtxoNetworkType.TEST },
  { network: Network.LITECOIN, type: UtxoNetworkType.MAIN },
  {
    network: Network.ZCASH_TESTNET,
    type: UtxoNetworkType.TEST,
    apiKey: ApiKey.testnet,
    skipEstimateSmartFee: true,
  },
  // { network: Network.ZCASH, type: UtxoNetworkType.MAIN, skipEstimateSmartFee: true },
  // {
  //   network: Network.BITCOIN_CASH_TESTNET,
  //   type: UtxoNetworkType.TEST,
  //   apiKey: process.env.V3_API_KEY_TESTNET,
  //   skipEstimateSmartFee: true,
  // },
  { network: Network.BITCOIN_CASH, type: UtxoNetworkType.MAIN, skipEstimateSmartFee: true },
]

describe.each(utxoTestNetworks)('UTXO E2E Test Suite', (testNetwork) => {
  describe(testNetwork.network, () => {
    UtxoE2eUtils.e2e(testNetwork)
  })
})
