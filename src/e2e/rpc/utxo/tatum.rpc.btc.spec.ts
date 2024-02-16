import { Bitcoin, Network } from '../../../service'
import { UtxoE2eUtils, UtxoNetworkType } from './utxo.e2e.utils'

describe('Bitcoin', () => {
  describe('mainnet', () => {
    it('getblock', async () => {
      const tatum = await UtxoE2eUtils.initTatum<Bitcoin>({
        network: Network.BITCOIN,
        type: UtxoNetworkType.MAIN,
      })
      const hash: string = '000000000000000000018d552ccb3928f02753dd5b2abe41d593db58c29a4e3f'
      const response = await tatum.rpc.getBlock(hash, 0)

      expect(response).toBeDefined()
      expect(typeof response.result).toBe('string')

      await tatum.destroy()
    })
  })
})
