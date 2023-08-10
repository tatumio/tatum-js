import { BaseEvmClass, Network, RpcNodeType, TatumSDK } from '../../service'
import { EvmE2eUtils } from './evm.e2e.utils'

describe('Ethereum', () => {
  describe('mainnet', () => {
    EvmE2eUtils.e2e({ network: Network.ETHEREUM, chainId: 1 })
  })

  describe('sepolia', () => {
    EvmE2eUtils.e2e({ network: Network.ETHEREUM_SEPOLIA, chainId: 11155111 })
  })

  it('custom rpc provider', async () => {
    const tatum = await TatumSDK.init<BaseEvmClass>({
      network: Network.ETHEREUM,
      verbose: true,
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
    expect(result?.toNumber()).toBe(1)
    tatum.destroy()
  })
})
