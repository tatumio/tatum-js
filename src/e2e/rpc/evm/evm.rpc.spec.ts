import { Network } from '../../../dto'
import { EvmE2eUtils } from './evm.e2e.utils'

const testNetworks = [
  { network: Network.CELO, expected: { chainId: 42220 } },
  { network: Network.CELO_ALFAJORES, expected: { chainId: 44787 } },
  { network: Network.ARBITRUM_ONE, expected: { chainId: 42161 } },
  { network: Network.ARBITRUM_NOVA, expected: { chainId: 42170 }, apiKey: process.env.V3_API_KEY_MAINNET },
  {
    network: Network.ARBITRUM_NOVA_TESTNET,
    expected: { chainId: 421613 },
    apiKey: process.env.V3_API_KEY_TESTNET,
  },
  //{ network: Network.HORIZEN_EON, expected: { chainId: 7332 } },
  { network: Network.HORIZEN_EON_GOBI, expected: { chainId: 1663 } },
  { network: Network.CHILIZ, expected: { chainId: 88888 } },
  { network: Network.BINANCE_SMART_CHAIN, expected: { chainId: 56 } },
  {
    network: Network.BINANCE_SMART_CHAIN_TESTNET,
    expected: { chainId: 97 },
    apiKey: process.env.V3_API_KEY_TESTNET,
  },
  { network: Network.FLARE, expected: { chainId: 14 } },
  { network: Network.FLARE_SONGBIRD, expected: { chainId: 19 } },
  { network: Network.FLARE_COSTON, expected: { chainId: 16 } },
  { network: Network.FLARE_COSTON_2, expected: { chainId: 114 } },
  { network: Network.ETHEREUM, expected: { chainId: 1 } },
  { network: Network.ETHEREUM_SEPOLIA, expected: { chainId: 11155111 } },
  { network: Network.ETHEREUM_HOLESKY, expected: { chainId: 17000 } },
  { network: Network.ETHEREUM_CLASSIC, expected: { chainId: 61 } },
  { network: Network.POLYGON, expected: { chainId: 137 } },
  //{ network: Network.POLYGON_MUMBAI, expected: { chainId: 80001 } },
  { network: Network.OPTIMISM, expected: { chainId: 10 } },
  { network: Network.HAQQ, expected: { chainId: 11235 } },
  { network: Network.HAQQ_TESTNET, expected: { chainId: 54211 } },
  {
    network: Network.TRON,
    expected: { chainId: 728126428 },
    data: {
      estimateGas: {
        from: '0x41F0CC5A2A84CD0F68ED1667070934542D673ACBD8',
        to: '0x4170082243784DCDF3042034E7B044D6D342A91360',
        gas: '0x01',
        gasPrice: '0x8c',
        value: '0x01',
        data: '0x70a08231000000000000000000000041f0cc5a2a84cd0f68ed1667070934542d673acbd8',
      },
    },
  },
  {
    network: Network.TRON_SHASTA,
    expected: { chainId: 2494104990 },
    skipEstimateGas: true,
    apiKey: process.env.V3_API_KEY_TESTNET,
  },
  {
    network: Network.KLAYTN,
    expected: { chainId: 8217 },
  },
  {
    network: Network.KLAYTN_BAOBAB,
    expected: { chainId: 1001 },
    apiKey: process.env.V4_API_KEY_TESTNET,
  },
  {
    network: Network.AVALANCHE_C,
    expected: { chainId: 43114 },
  },
  {
    network: Network.AVALANCHE_C_TESTNET,
    expected: { chainId: 43113 },
    apiKey: process.env.V3_API_KEY_TESTNET,
  },
]

describe.each(testNetworks)('RPC EVM', (testNetwork) => {
  const { network } = testNetwork
  describe(network, () => {
    EvmE2eUtils.e2e(testNetwork)
  })
})
