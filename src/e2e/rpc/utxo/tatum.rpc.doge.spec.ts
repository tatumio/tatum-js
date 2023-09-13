import { Network } from '../../../service'
import { UtxoE2eUtils } from './utxo.e2e.utils'

describe('Doge', () => {
  describe('mainnet', () => {
    it('createrawtransaction', async () => {
      const tatum = await UtxoE2eUtils.initTatum(Network.DOGECOIN)
      const result = await tatum.rpc.createRawTransaction(
        [
          {
            txid: '2a68e952c4ebba0cebfbc0b87a2779a50d53a4b4b4e498c2ffee213c0874f0ce',
            vout: 1,
          },
        ],
        {
          DDTtqnuZ5kfRT5qh2c7sNtqrJmV3iXYdGG: 0.0000031,
        },
      )

      expect(result.result).not.toBeNull()
      tatum.destroy()
    })
  })
})
