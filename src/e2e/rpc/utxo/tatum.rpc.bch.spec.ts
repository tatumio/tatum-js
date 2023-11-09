import { BitcoinCash, Network } from '../../../service'
import { UtxoE2eUtils, UtxoNetworkType } from './utxo.e2e.utils'

describe('Bitcoin Cash', () => {
  describe('mainnet', () => {
    it('estimatefee', async () => {
      const tatum = await UtxoE2eUtils.initTatum<BitcoinCash>({
        network: Network.BITCOIN_CASH,
        type: UtxoNetworkType.MAIN,
      })
      const result = await tatum.rpc.estimateFee()
      await tatum.destroy()
      expect(result.result).not.toBeNull()
    })
  })

  describe('testnet', () => {
    it('estimatefee', async () => {
      const tatum = await UtxoE2eUtils.initTatum<BitcoinCash>({
        network: Network.BITCOIN_CASH,
        type: UtxoNetworkType.TEST,
      })
      const result = await tatum.rpc.estimateFee()
      await tatum.destroy()
      expect(result.result).not.toBeNull()
    })
  })
})
