import { Iota, Network, TatumSDK } from '../../../service'
import { e2eUtil } from '../../e2e.util'

const getIotaRpc = async (testnet?: boolean) => await TatumSDK.init<Iota>(e2eUtil.initConfig(testnet ? Network.IOTA_TESTNET : Network.IOTA))

describe.each([true, false])('Iota', (testnet) => {
  describe.skip(`${testnet ? Network.IOTA_TESTNET : Network.IOTA}`, () => {
    it('getNodeInfo', async () => {
      const tatum = await getIotaRpc(testnet)
      const info = await tatum.rpc.getNodeInfo()
      await tatum.destroy()
      expect(info).toBeDefined()
    })

    it('getTips', async () => {
      const tatum = await getIotaRpc(testnet)
      const tips = await tatum.rpc.getTips()
      await tatum.destroy()
      expect(tips).toBeDefined()
    })

    it('getReceipts', async () => {
      const tatum = await getIotaRpc(testnet)
      const receipts = await tatum.rpc.getAllReceipts()
      await tatum.destroy()
      expect(receipts).toBeDefined()
    })
  })
})
