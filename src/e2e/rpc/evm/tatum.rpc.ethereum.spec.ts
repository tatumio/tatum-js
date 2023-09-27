import process from 'process'
import { BaseEvmClass, Network, RpcNodeType, TatumSDK } from '../../../service'
import { EvmE2eUtils } from './evm.e2e.utils'

describe('Ethereum', () => {
  it('should get token total supply', async () => {
    const tatum = await EvmE2eUtils.initTatum(Network.ETHEREUM, process.env.V4_API_KEY_MAINNET)
    const { result } = await tatum.rpc.getTokenTotalSupply('0xdac17f958d2ee523a2206206994597c13d831ec7')
    await tatum.destroy()
    expect(result).toBeDefined()
    expect(result?.isGreaterThan(1))
  })

  it('should get token cap', async () => {
    const tatum = await EvmE2eUtils.initTatum(Network.ETHEREUM, process.env.V4_API_KEY_MAINNET)
    const { result } = await tatum.rpc.getTokenCap('0x43044f861ec040DB59A7e324c40507adDb673142')
    await tatum.destroy()
    expect(result).toBeDefined()
    expect(result?.isGreaterThan(1))
  })

  it('should return true if contract is a multitoken', async () => {
    const tatum = await EvmE2eUtils.initTatum(Network.ETHEREUM, process.env.V4_API_KEY_MAINNET)
    const { result } = await tatum.rpc.supportsInterfaceERC1155('0xF4Dd946D1406e215a87029db56C69e1Bcf3e1773')
    await tatum.destroy()
    expect(result).toBeDefined()
    expect(result).toBeTruthy()
  })

  it('custom rpc provider', async () => {
    const tatum = await TatumSDK.init<BaseEvmClass>({
      network: Network.ETHEREUM,
      rpc: {
        nodes: [
          {
            url: process.env.NON_TATUM_RPC_ETH_URL as string,
            type: RpcNodeType.NORMAL,
          },
        ],
      },
      apiKey: {
        v4: process.env.V4_API_KEY_MAINNET,
      },
    })
    const { result } = await tatum.rpc.chainId()
    await tatum.destroy()
    expect(result?.toNumber()).toBe(1)
  })

  it('debug storage range at', async () => {
    const tatum = await EvmE2eUtils.initTatum(Network.ETHEREUM, process.env.V4_API_KEY_MAINNET)
    const result = await tatum.rpc.debugStorageRangeAt(
      '0x76f64c40d6493cf00426be2eecdaf3f968768619bfb21ce6c57921be497ab3f7',
      0,
      '0xdafea492d9c6733ae3d56b7ed1adb60692c98bc5',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '1',
    )

    await tatum.destroy()

    console.log(result)
  })

  it('get logs', async () => {
    const tatum = await EvmE2eUtils.initTatum(Network.ETHEREUM, process.env.V4_API_KEY_MAINNET)
    const result = await tatum.rpc.getLogs({
      address:'0xdafea492d9c6733ae3d56b7ed1adb60692c98bc5'
      }
    )

    expect(result.result).toStrictEqual([])
    await tatum.destroy()
  })
})
