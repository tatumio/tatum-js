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
      const info = await tatum.rpc.getBlockChainInfo()
      expect(info.chain).toBe(type)
      tatum.rpc.destroy()
    })

    it('chain info raw call', async () => {
      const tatum = await UtxoE2eUtils.initTatum(network)
      const info = await tatum.rpc.rawRpcCall({
        method: 'getblockchaininfo',
        id: '1',
        jsonrpc: '2.0',
      })
      expect(info.result.chain).toBe(type)
    })

    it('best block hash', async () => {
      const tatum = await UtxoE2eUtils.initTatum(network)
      const bestBlockHash = await tatum.rpc.getBestBlockHash()
      expect(bestBlockHash).toBeTruthy()
      tatum.rpc.destroy()
    })

    it('block count', async () => {
      const tatum = await UtxoE2eUtils.initTatum(network)
      const blockCount = await tatum.rpc.getBlockCount()
      expect(blockCount).toBeGreaterThan(0)
      tatum.rpc.destroy()
    })

    it('difficulty', async () => {
      const tatum = await UtxoE2eUtils.initTatum(network)
      const difficulty = await tatum.rpc.getDifficulty()
      expect(difficulty).toBeGreaterThan(0)
      tatum.rpc.destroy()
    })

    it('mempool info', async () => {
      const tatum = await UtxoE2eUtils.initTatum(network)
      const mempoolInfo = await tatum.rpc.getMempoolInfo()
      expect(mempoolInfo).toBeDefined()
      tatum.rpc.destroy()
    })

  },
}
