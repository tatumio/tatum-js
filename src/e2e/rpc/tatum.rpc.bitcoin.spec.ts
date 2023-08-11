import { BigNumber } from 'bignumber.js'
import { ApiVersion, Ethereum, Network, TatumSDK } from '../../service'
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
    const tatum = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM,
      version: ApiVersion.V2,
      verbose: true,
      apiKey: {
        v2: 't-647835e1930be3001cb53f81-647835e2930be3001cb53f87',
      },
    })

    for (let i = 0; i < 1000000; i++) {
      const { result: blockNum } = await tatum.rpc.blockNumber()
      await tatum.rpc.getBlockByNumber((blockNum as BigNumber).toNumber())
      // Wait for 1 second before starting the next iteration
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }, 1000000)
})
