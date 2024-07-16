import { Network, RpcNodeType, TatumSDK, Ton } from '../../../service'
import { e2eUtil } from '../../e2e.util'

const getTonRpc = async (testnet: boolean) => {
  return await TatumSDK.init<Ton>({
    ...e2eUtil.initConfig(testnet ? Network.TON_TESTNET : Network.TON), rpc: {
      nodes: [
        {
          url: testnet ? 'https://testnet.tonapi.io' : 'https://tonapi.io',
          type: RpcNodeType.NORMAL,
        },
      ],
    },
  })
}

describe('Ton', () => {
  [true, false].forEach(testnet => {
    describe(testnet ? 'Testnet' : 'Mainnet', () => {
      it('status', async () => {
        const ton = await getTonRpc(testnet)
        const result = await ton.rpc.status()
        await ton.destroy()
        expect(result).toBeDefined()
      })

      it('getBlockchainValidators', async () => {
        const ton = await getTonRpc(testnet)
        const result = await ton.rpc.getBlockchainValidators()
        await ton.destroy()
        expect(result).toBeDefined()
      })
    })
  })
})
