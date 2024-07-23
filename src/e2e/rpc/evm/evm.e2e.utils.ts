import { BigNumber } from 'bignumber.js'
import { Network } from '../../../dto'
import { BaseEvm, TatumSDK } from '../../../service'
import { NetworkUtils } from '../../../util/network.utils'
import { e2eUtil } from '../../e2e.util'

interface EvmE2eI {
  network: Network
  apiKey?: string
  data?: {
    estimateGas?: any
  }
  skipEstimateGas?: boolean
  url?: string
}

export const EvmE2eUtils = {
  initTatum: async <T extends BaseEvm>(network: Network, apiKey?: string, url?: string) =>
    TatumSDK.init<T>(e2eUtil.initConfig(network, apiKey, url)),
  e2e: (evmE2eI: EvmE2eI) => {
    const { network, data, skipEstimateGas, apiKey, url } = evmE2eI
    it('eth_blockNumber', async () => {
      const tatum = await EvmE2eUtils.initTatum(network, apiKey, url)
      const { result } = await tatum.rpc.blockNumber()

      await tatum.destroy()
      expect(result?.toNumber()).toBeGreaterThan(0)
    })

    it('eth_chainId', async () => {
      const tatum = await EvmE2eUtils.initTatum(network, apiKey, url)
      const { result } = await tatum.rpc.chainId()

      tatum.rpc.destroy()
      expect(result?.toNumber()).toBe(NetworkUtils.getChainId(network))
    })

    if (!skipEstimateGas) {
      it('eth_estimateGas', async () => {
        const tatum = await EvmE2eUtils.initTatum(network, apiKey, url)
        const estimateGas = data?.estimateGas ?? {
          from: '0xb4c9E4617a16Be36B92689b9e07e9F64757c1792',
          to: '0x4675C7e5BaAFBFFbca748158bEcBA61ef3b0a263',
          value: '0x0',
        }
        const { result } = await tatum.rpc.estimateGas(estimateGas)
        await tatum.destroy()
        expect(result?.toNumber()).toBeGreaterThanOrEqual(0)
      })
    }

    it('eth_gasPrice', async () => {
      const tatum = await EvmE2eUtils.initTatum(network, apiKey, url)
      const { result } = await tatum.rpc.gasPrice()

      await tatum.destroy()
      expect(result?.toNumber()).toBeGreaterThan(0)
    })

    it('web3_clientVersion', async () => {
      const tatum = await EvmE2eUtils.initTatum(network, apiKey, url)
      const { result } = await tatum.rpc.clientVersion()

      await tatum.destroy()
      expect(result).toBeTruthy()
    })

    it('eth_getBlockByNumber', async () => {
      const tatum = await EvmE2eUtils.initTatum(network, apiKey, url)
      const { result } = await tatum.rpc.blockNumber()
      const { result: block } = await tatum.rpc.getBlockByNumber((result as BigNumber).toNumber() - 1000)
      await tatum.destroy()
      expect(block.timestamp).toBeDefined()
      expect(block.size).toBeDefined()
    })
  },
}
