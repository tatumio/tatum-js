import { Iota, Network, TatumSDK } from '../../../service'
import { e2eUtil } from '../../e2e.util'

const getIotaRpc = async () => await TatumSDK.init<Iota>(e2eUtil.initConfig(Network.IOTA))

describe('Iota', () => {
  describe('mainnet', () => {
    it('getNodeInfo', async () => {
      const tatum = await getIotaRpc()
      const info = await tatum.rpc.getNodeInfo()
      await tatum.destroy()
      expect(info).toBeDefined()
    })

    it('getTips', async () => {
      const tatum = await getIotaRpc()
      const tips = await tatum.rpc.getTips()
      await tatum.destroy()
      expect(tips).toBeDefined()
    })

    it('getReceipts', async () => {
      const tatum = await getIotaRpc()
      const receipts = await tatum.rpc.getAllReceipts()
      await tatum.destroy()
      expect(receipts).toBeDefined()
    })
  })
})
