import { Network, TatumSDK, Ton } from '../../../service'
import { e2eUtil } from '../../e2e.util'

const getTonClient = async (testnet: boolean) => {
  return await TatumSDK.init<Ton>(e2eUtil.initConfig(testnet ? Network.TON_TESTNET : Network.TON))
}

describe('Ton', () => {
  [true, false].forEach(testnet => {
    describe(testnet ? 'Testnet' : 'Mainnet', () => {
      it('status', async () => {
        const ton = await getTonClient(testnet)
        const result = await ton.rpc.getBlockchainMasterchainHead()
        await ton.destroy()
        expect(result).toBeDefined()
      })
      it('getMasterchainInfo', async () => {
        const ton = await getTonClient(testnet)
        const result = await ton.rpc.getMasterchainInfo()
        await ton.destroy()
        expect(result).toBeDefined()
      })
    })
  })
})
