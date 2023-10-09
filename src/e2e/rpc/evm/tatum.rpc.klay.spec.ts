import { BigNumber } from 'bignumber.js'
import { Klaytn, Network } from '../../../service'
import { EvmE2eUtils } from './evm.e2e.utils'

const run = async (network: Network, chainId: number) => {
  describe('klay prefix', () => {
    it('klay_blockNumber', async () => {
      const tatum = await EvmE2eUtils.initTatum<Klaytn>(network)
      const { result } = await tatum.rpc.blockNumber(true)

      await tatum.destroy()
      expect(result?.toNumber()).toBeGreaterThan(0)
    })

    it('klay_chainId', async () => {
      const tatum = await EvmE2eUtils.initTatum<Klaytn>(network)
      const result = await tatum.rpc.chainId(true)

      await tatum.destroy()
      expect(result?.result?.toNumber()).toBe(chainId)
    })

    it('klay_gasPrice', async () => {
      const tatum = await EvmE2eUtils.initTatum<Klaytn>(network)
      const { result } = await tatum.rpc.gasPrice(true)

      await tatum.destroy()
      expect(result?.toNumber()).toBeGreaterThan(0)
    })

    it('klay_getBlockByNumber', async () => {
      const tatum = await EvmE2eUtils.initTatum<Klaytn>(network)
      const { result } = await tatum.rpc.blockNumber(true)
      const { result: block } = await tatum.rpc.getBlockByNumber(
        (result as BigNumber).toNumber() - 1000,
        false,
        true,
      )
      await tatum.destroy()
      expect(block.timestamp).toBeDefined()
      expect(block.size).toBeDefined()
    })

    it('web3_clientVersion', async () => {
      const tatum = await EvmE2eUtils.initTatum<Klaytn>(network)
      const { result } = await tatum.rpc.clientVersion()

      await tatum.destroy()
      expect(result).toBeDefined()
    })
  })
}

describe.each([
  { network: Network.KLAYTN, expected: { chainId: 8217 } },
  { network: Network.KLAYTN_BAOBAB, expected: { chainId: 1001 } },
])('RPC Klaytn', (network) => {
  const { network: networkName, expected } = network
  describe(networkName, () => {
    run(networkName, expected.chainId)
  })
})
