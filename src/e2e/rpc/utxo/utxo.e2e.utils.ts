import { Network } from '../../../dto'
import { BaseUtxo, TatumSDK } from '../../../service'
import { e2eUtil } from '../../e2e.util'

export enum UtxoNetworkType {
  MAIN = 'main',
  TEST = 'test',
}

interface TatumBtcUtils {
  type: UtxoNetworkType
  network: Network
  apiKey?: string
  skipEstimateSmartFee?: boolean
}

export const UtxoE2eUtils = {
  initTatum: async <T extends BaseUtxo>(params: TatumBtcUtils) =>
    TatumSDK.init<T>(e2eUtil.initConfig(params.network, params.apiKey)),
  e2e: (params: TatumBtcUtils) => {
    const { type } = params
    it('chain info', async () => {
      const tatum = await UtxoE2eUtils.initTatum(params)
      const { result } = await tatum.rpc.getBlockChainInfo()

      await tatum.destroy()
      expect(result.chain).toBe(type)
    })

    it('chain info raw call', async () => {
      const tatum = await UtxoE2eUtils.initTatum(params)
      const info = await tatum.rpc.rawRpcCall({
        method: 'getblockchaininfo',
        id: '1',
        jsonrpc: '2.0',
      })
      await tatum.destroy()
      expect(info.result.chain).toBe(type)
    })

    it('best block hash', async () => {
      const tatum = await UtxoE2eUtils.initTatum(params)
      const { result } = await tatum.rpc.getBestBlockHash()

      await tatum.destroy()
      expect(result).toBeTruthy()
    })

    it('block count', async () => {
      const tatum = await UtxoE2eUtils.initTatum(params)
      const { result } = await tatum.rpc.getBlockCount()

      await tatum.destroy()
      expect(result).toBeGreaterThan(0)
    })

    it('difficulty', async () => {
      const tatum = await UtxoE2eUtils.initTatum(params)
      const { result } = await tatum.rpc.getDifficulty()

      await tatum.destroy()
      expect(result).toBeGreaterThan(0)
    })

    it('mempool info', async () => {
      const tatum = await UtxoE2eUtils.initTatum(params)
      const { result } = await tatum.rpc.getMempoolInfo()

      await tatum.destroy()
      expect(result).toBeDefined()
    })

    if (!params.skipEstimateSmartFee) {
      it('estimatesmartfee', async () => {
        const tatum = await UtxoE2eUtils.initTatum(params)
        const result = await tatum.rpc.estimateSmartFee(6)

        await tatum.destroy()
        expect(result.result).not.toBeNull()
      })
    }
  },
}
