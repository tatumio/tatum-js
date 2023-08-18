import { BigNumber } from 'bignumber.js'
import { Network } from '../../dto'
import { BaseEvmClass, TatumSDK } from '../../service'
import { RpcE2eUtils } from './rpc.e2e.utils'

export const EvmE2eUtils = {
  initTatum: async (network: Network) => TatumSDK.init<BaseEvmClass>(RpcE2eUtils.initConfig(network)),
  e2e: ({ network, chainId }: { network: Network; chainId: number }) => {
    it('eth_blockNumber', async () => {
      const tatum = await EvmE2eUtils.initTatum(network)
      const { result } = await tatum.rpc.blockNumber()

      tatum.destroy()
      expect(result?.toNumber()).toBeGreaterThan(0)
    })

    it('eth_chainId', async () => {
      const tatum = await EvmE2eUtils.initTatum(network)
      const { result } = await tatum.rpc.chainId()

      tatum.rpc.destroy()
      expect(result?.toNumber()).toBe(chainId)
    })

    it('eth_estimateGas', async () => {
      const tatum = await EvmE2eUtils.initTatum(network)
      const { result } = await tatum.rpc.estimateGas({
        from: '0xb4c9E4617a16Be36B92689b9e07e9F64757c1792',
        to: '0x4675C7e5BaAFBFFbca748158bEcBA61ef3b0a263',
        value: '0x0',
      })

      tatum.destroy()
      expect(result?.toNumber()).toBeGreaterThan(0)
    })

    it('eth_gasPrice', async () => {
      const tatum = await EvmE2eUtils.initTatum(network)
      const { result } = await tatum.rpc.gasPrice()

      tatum.destroy()
      expect(result?.toNumber()).toBeGreaterThan(0)
    })

    it('web3_clientVersion', async () => {
      const tatum = await EvmE2eUtils.initTatum(network)
      const { result } = await tatum.rpc.clientVersion()

      tatum.destroy()
      expect(result).toBeTruthy()
    })

    it('eth_getBlockByNumber', async () => {
      const tatum = await EvmE2eUtils.initTatum(network)
      const { result } = await tatum.rpc.blockNumber()
      const { result: block } = await tatum.rpc.getBlockByNumber((result as BigNumber).toNumber() - 1000)
      tatum.destroy()
      expect(block.timestamp).toBeDefined()
      expect(block.size).toBeDefined()
    })
  },
}
