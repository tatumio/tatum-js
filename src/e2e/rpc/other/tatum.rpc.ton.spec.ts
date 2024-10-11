import { Network, TatumSDK, Ton } from '../../../service'
import { e2eUtil } from '../../e2e.util'

const getTonClient = async (testnet?: boolean) => {
  return await TatumSDK.init<Ton>(e2eUtil.initConfig(testnet ? Network.TON_TESTNET : Network.TON))
}

describe('Ton', () => {
  describe('Testnet', () => {
    it('Ton V2 API - status', async () => {
      const ton = await getTonClient(true)
      const result = await ton.rpc.getBlockchainMasterchainHead()
      await ton.destroy()
      expect(result).toBeDefined()
    })
    it('Ton Http API - getMasterchainInfo', async () => {
      const ton = await getTonClient(true)
      const result = await ton.rpc.getMasterchainInfo()
      await ton.destroy()
      expect(result).toBeDefined()
    })
  })

  describe('Mainnet', () => {
    it.skip('Ton V2 API - status', async () => {
      const ton = await getTonClient()
      const result = await ton.rpc.getBlockchainMasterchainHead()
      await ton.destroy()
      expect(result).toBeDefined()
    })
    it('Ton Http API - getMasterchainInfo', async () => {
      const ton = await getTonClient()
      const result = await ton.rpc.getMasterchainInfo()
      await ton.destroy()
      expect(result).toBeDefined()
    })
  })
})
