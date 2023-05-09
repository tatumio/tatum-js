import { Ripple } from '../dto'
import { Network, TatumSDK } from '../service'

const getRippleRpc = async (testnet?: boolean) =>
  await TatumSDK.init<Ripple>({
    network: testnet ? Network.XRP_TESTNET : Network.XRP,
    verbose: true,
    retryCount: 1,
    retryDelay: 2000,
  })

describe('RPCs', () => {
  describe('Ripple', () => {
    describe('testnet', () => {
      it('ping: should get connection status', async () => {
        const tatum = await getRippleRpc(true)
        const res = await tatum.rpc.ping()
        expect(res.status).toBe('success')
      })
    })
  })
})
