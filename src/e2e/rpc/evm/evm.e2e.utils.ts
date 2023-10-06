import { BigNumber } from 'bignumber.js'
import { Network } from '../../../dto'
import { BaseEvmClass, TatumSDK } from '../../../service'
import { RpcE2eUtils } from '../rpc.e2e.utils'

interface evmE2eI {
  network: Network
  apiKey?: string
  expected: {
    chainId: number
  }
  data?: {
    estimateGas?: any
  }
  skipEstimateGas?: boolean
}

export const EvmE2eUtils = {
  initTatum: async <T extends BaseEvmClass>(network: Network, apiKey?: string) =>
    TatumSDK.init<T>(RpcE2eUtils.initConfig(network, apiKey)),
  e2e: (evmE2eI: evmE2eI) => {
    const { network, expected, data, skipEstimateGas, apiKey } = evmE2eI
    it('eth_blockNumber', async () => {
      const tatum = await EvmE2eUtils.initTatum(network, apiKey)
      const { result } = await tatum.rpc.blockNumber()

      await tatum.destroy()
      expect(result?.toNumber()).toBeGreaterThan(0)
    })

    it('eth_chainId', async () => {
      const tatum = await EvmE2eUtils.initTatum(network, apiKey)
      const { result } = await tatum.rpc.chainId()

      tatum.rpc.destroy()
      expect(result?.toNumber()).toBe(expected.chainId)
    })

    if (!skipEstimateGas) {
      it('eth_estimateGas', async () => {
        const tatum = await EvmE2eUtils.initTatum(network, apiKey)
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
      const tatum = await EvmE2eUtils.initTatum(network, apiKey)
      const { result } = await tatum.rpc.gasPrice()

      await tatum.destroy()
      expect(result?.toNumber()).toBeGreaterThan(0)
    })

    it('web3_clientVersion', async () => {
      const tatum = await EvmE2eUtils.initTatum(network, apiKey)
      const { result } = await tatum.rpc.clientVersion()

      await tatum.destroy()
      expect(result).toBeTruthy()
    })

    it('eth_getBlockByNumber', async () => {
      const tatum = await EvmE2eUtils.initTatum(network, apiKey)
      const { result } = await tatum.rpc.blockNumber()
      const { result: block } = await tatum.rpc.getBlockByNumber((result as BigNumber).toNumber() - 1000)
      await tatum.destroy()
      expect(block.timestamp).toBeDefined()
      expect(block.size).toBeDefined()
    })
  },
}
