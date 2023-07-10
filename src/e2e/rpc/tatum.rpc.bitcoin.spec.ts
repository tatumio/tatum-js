import { ApiVersion, Bitcoin, Network, TatumSDK } from '../../service'
import { UtxoE2eUtils } from './utxo.e2e.utils'

describe('Bitcoin', () => {
  describe('testnet', () => {
    UtxoE2eUtils.e2e({ network: Network.BITCOIN_TESTNET, type: 'test' })
  })

  describe('mainnet', () => {
    UtxoE2eUtils.e2e({ network: Network.BITCOIN, type: 'main' })
  })

  // Used for testing New Relic usage
  it.skip('static rpc 1000000 requests', async () => {
    const tatum = await TatumSDK.init<Bitcoin>({
      network: Network.BITCOIN,
      version: ApiVersion.V2,
      verbose: true,
      apiKey: {
        v2: 't-646b50dc56974f10418581e1-646b50dc56974f10418581e7',
      },
    })

    for (let i = 0; i < 1000000; i++) {
      await tatum.rpc.getBlockChainInfo()
      // Wait for 1 second before starting the next iteration
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }, 1000000)
})
