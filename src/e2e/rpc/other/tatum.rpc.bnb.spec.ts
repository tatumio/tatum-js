import * as process from 'process'
import { Bnb, Network, TatumSDK } from '../../../service'
import { e2eUtil } from '../../e2e.util'

const getBnbRpc = async () =>
  await TatumSDK.init<Bnb>({
    network: Network.BNB,
    apiKey: {
      v4: process.env.V4_API_KEY_MAINNET,
    },
    verbose: e2eUtil.isVerbose,
  })

// Testnet is not available
describe('Bnb', () => {
  describe('mainnet', () => {
    it('block', async () => {
      const tatum = await getBnbRpc()
      const { result } = await tatum.rpc.block()
      await tatum.destroy()
      expect(result).toBeDefined()
    })

    it('abciInfo', async () => {
      const tatum = await getBnbRpc()
      const { result } = await tatum.rpc.abciInfo()
      await tatum.destroy()
      expect(result).toBeDefined()
    })

    it('blockchain', async () => {
      const tatum = await getBnbRpc()
      const { result } = await tatum.rpc.blockchain()
      await tatum.destroy()
      expect(result).toBeDefined()
    })

    it('health', async () => {
      const tatum = await getBnbRpc()
      const { result } = await tatum.rpc.health()
      await tatum.destroy()
      expect(result).toBeDefined()
    })

    it('genesis', async () => {
      const tatum = await getBnbRpc()
      const { result } = await tatum.rpc.genesis()
      await tatum.destroy()
      expect(result).toBeDefined()
    })

    it('validators', async () => {
      const tatum = await getBnbRpc()
      const { result } = await tatum.rpc.validators()
      await tatum.destroy()
      expect(result).toBeDefined()
    })

    it('unconfirmedTxs', async () => {
      const tatum = await getBnbRpc()
      const { result } = await tatum.rpc.unconfirmedTxs({ limit: '1' })
      await tatum.destroy()
      expect(result).toBeDefined()
    })

    it('raw rpc call', async () => {
      const tatum = await getBnbRpc()
      const { result } = await tatum.rpc.rawRpcCall({ method: 'block', id: 1, jsonrpc: '2.0', params: {} })
      await tatum.destroy()
      expect(result).toBeDefined()
    })
  })
})
