import { BaseEvmClass, Ethereum, Network, RpcNodeType, TatumSDK } from '../../service'
import { EvmE2eUtils } from './evm.e2e.utils'

describe('Ethereum', () => {
  describe('mainnet', () => {
    EvmE2eUtils.e2e({ network: Network.ETHEREUM, chainId: 1 })
  })

  it('should get token total supply', async () => {
    const tatum = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM })
    const { result } = await tatum.rpc.getTokenTotalSupply('0xdac17f958d2ee523a2206206994597c13d831ec7')
    tatum.destroy()
    expect(result).toBeDefined()
    expect(result?.isGreaterThan(1))
  })

  it('should get token cap', async () => {
    const tatum = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM })
    const { result } = await tatum.rpc.getTokenCap('0x43044f861ec040DB59A7e324c40507adDb673142')
    tatum.destroy()
    expect(result).toBeDefined()
    expect(result?.isGreaterThan(1))
  })

  it('should return true if contract is a multitoken', async () => {
    const tatum = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM })
    const { result } = await tatum.rpc.supportsInterfaceERC1155('0xF4Dd946D1406e215a87029db56C69e1Bcf3e1773')
    tatum.destroy()
    expect(result).toBeDefined()
    expect(result).toBeTruthy()
  })

  describe('sepolia', () => {
    EvmE2eUtils.e2e({ network: Network.ETHEREUM_SEPOLIA, chainId: 11155111 })
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
    })
    const { result } = await tatum.rpc.chainId()
    tatum.destroy()
    expect(result?.toNumber()).toBe(1)
  })
})
