import { Network } from '../../dto'
import { BaseEvmClass, TatumSDK } from '../../service'
import { Status } from '../../util'
import { RpcE2eUtils } from './rpc.e2e.utils'

export const EvmE2eUtils = {
  initTatum: async (network: Network) => TatumSDK.init<BaseEvmClass>(RpcE2eUtils.initConfig(network)),
  e2e: ({ network, chainId }: { network: Network; chainId: number }) => {
    it('chain info', async () => {
      const tatum = await EvmE2eUtils.initTatum(network)
      const { data, status } = await tatum.rpc.blockNumber()

      expect(status).toBe(Status.SUCCESS)
      expect(data.toNumber()).toBeGreaterThan(0)
      tatum.rpc.destroy()
    })

    it('chain id', async () => {
      const tatum = await EvmE2eUtils.initTatum(network)
      const { data, status } = await tatum.rpc.chainId()

      expect(status).toBe(Status.SUCCESS)
      expect(data.toNumber()).toBe(chainId)
      tatum.rpc.destroy()
    })

    it('estimate gas', async () => {
      const tatum = await EvmE2eUtils.initTatum(network)
      const { data, status } = await tatum.rpc.estimateGas({
        from: '0xb4c9E4617a16Be36B92689b9e07e9F64757c1792',
        to: '0x4675C7e5BaAFBFFbca748158bEcBA61ef3b0a263',
        value: '0x0',
      })

      expect(status).toBe(Status.SUCCESS)
      expect(data.toNumber()).toBeGreaterThan(0)
      tatum.rpc.destroy()
    })

    it('gas price', async () => {
      const tatum = await EvmE2eUtils.initTatum(network)
      const { data, status } = await tatum.rpc.gasPrice()

      expect(status).toBe(Status.SUCCESS)
      expect(data.toNumber()).toBeGreaterThan(0)
      tatum.rpc.destroy()
    })

    it('client version', async () => {
      const tatum = await EvmE2eUtils.initTatum(network)
      const { data, status } = await tatum.rpc.clientVersion()

      expect(status).toBe(Status.SUCCESS)
      expect(data).toBeTruthy()
      tatum.rpc.destroy()
    })
  },
}
