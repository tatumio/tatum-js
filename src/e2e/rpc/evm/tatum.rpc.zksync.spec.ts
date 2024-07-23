import { Network, ZkSync } from '../../../service'
import { EvmE2eUtils } from './evm.e2e.utils'

const run = async (network: Network, url: string) => {
    it('zks_getL1GasPrice', async () => {
      const tatum = await EvmE2eUtils.initTatum<ZkSync>(network, undefined, url)
      const { result } = await tatum.rpc.zksGetL1GasPrice()

      await tatum.destroy()
      expect(result).toBeDefined()
    })

  it('zks_getBlockDetails', async () => {
    const tatum = await EvmE2eUtils.initTatum<ZkSync>(network, undefined, url)
    const { result } = await tatum.rpc.zksGetBlockDetails(39830202)

    await tatum.destroy()
    expect(result).toBeDefined()
  })

  it('zks_getBaseTokenL1Address', async () => {
    const tatum = await EvmE2eUtils.initTatum<ZkSync>(network, undefined, url)
    const { result } = await tatum.rpc.zksGetBaseTokenL1Address()

    await tatum.destroy()
    expect(result).toBeDefined()
  })

  it('zks_getFeeParams', async () => {
    const tatum = await EvmE2eUtils.initTatum<ZkSync>(network, undefined, url)
    const { result } = await tatum.rpc.zksGetFeeParams()

    await tatum.destroy()
    expect(result).toBeDefined()

  })
}

describe.each([
  { network: Network.ZK_SYNC, url: 'https://mainnet.era.zksync.io'  },
  { network: Network.ZK_SYNC_TESTNET, url: 'https://sepolia.era.zksync.dev'},
])('RPC ZkSync', (network) => {
  const { network: networkName, url } = network
  describe(networkName, () => {
    run(networkName, url)
  })
})
