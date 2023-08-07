import { Network } from '../../dto'
import { BaseUtxoClass, TatumSDK } from '../../service'
import { RpcE2eUtils } from './rpc.e2e.utils'

interface TatumBtcUtils {
  type: string
  network: Network
}

export const UtxoE2eUtils = {
  initTatum: async (network: Network) => TatumSDK.init<BaseUtxoClass>(RpcE2eUtils.initConfig(network)),
  e2e: ({ type, network }: TatumBtcUtils) => {
    it('chain info', async () => {
      const tatum = await UtxoE2eUtils.initTatum(network)
      const { result } = await tatum.rpc.getBlockChainInfo()

      expect(result.chain).toBe(type)
      tatum.destroy()
    })

    it('chain info raw call', async () => {
      const tatum = await UtxoE2eUtils.initTatum(network)
      const info = await tatum.rpc.rawRpcCall({
        method: 'getblockchaininfo',
        id: '1',
        jsonrpc: '2.0',
      })
      expect(info.result.chain).toBe(type)
      tatum.destroy()
    })

    it('best block hash', async () => {
      const tatum = await UtxoE2eUtils.initTatum(network)
      const { result } = await tatum.rpc.getBestBlockHash()

      expect(result).toBeTruthy()
      tatum.destroy()
    })

    it('block count', async () => {
      const tatum = await UtxoE2eUtils.initTatum(network)
      const { result } = await tatum.rpc.getBlockCount()

      expect(result).toBeGreaterThan(0)
      tatum.destroy()
    })

    it('difficulty', async () => {
      const tatum = await UtxoE2eUtils.initTatum(network)
      const { result } = await tatum.rpc.getDifficulty()

      expect(result).toBeGreaterThan(0)
      tatum.destroy()
    })

    it('mempool info', async () => {
      const tatum = await UtxoE2eUtils.initTatum(network)
      const { result } = await tatum.rpc.getMempoolInfo()

      expect(result).toBeDefined()
      tatum.destroy()
    })
  },
}
