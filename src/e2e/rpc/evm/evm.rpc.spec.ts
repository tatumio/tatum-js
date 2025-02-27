import { Network } from '../../../dto'
import { ApiKey } from '../../e2e.constant'
import { EvmE2eUtils } from './evm.e2e.utils'

const testNetworks = [
  { network: Network.CELO },
  // { network: Network.CELO_ALFAJORES },
  // { network: Network.ARBITRUM_ONE },
  { network: Network.ARBITRUM_NOVA, apiKey: ApiKey.mainnet },
  {
    network: Network.ARBITRUM_NOVA_TESTNET,
    apiKey: ApiKey.testnet,
  },
  // { network: Network.HORIZEN_EON },
  // { network: Network.HORIZEN_EON_GOBI },
  { network: Network.CHILIZ },
  { network: Network.BINANCE_SMART_CHAIN },
  {
    network: Network.BINANCE_SMART_CHAIN_TESTNET,
    apiKey: ApiKey.testnet,
  },
  { network: Network.FLARE },
  { network: Network.FLARE_SONGBIRD },
  // { network: Network.FLARE_COSTON },
  { network: Network.FLARE_COSTON_2 },
  { network: Network.ETHEREUM },
  { network: Network.ETHEREUM_SEPOLIA },
  { network: Network.ETHEREUM_HOLESKY },
  // { network: Network.FANTOM },
  // { network: Network.FANTOM_TESTNET, apiKey: process.env.V3_API_KEY_TESTNET },
  { network: Network.ETHEREUM_CLASSIC },
  // { network: Network.POLYGON },
  { network: Network.POLYGON_AMOY },
  // { network: Network.OPTIMISM },
  { network: Network.HAQQ },
  { network: Network.HAQQ_TESTNET },
  { network: Network.RONIN },
  { network: Network.RONIN_SAIGON },
  // {
  //   network: Network.TRON,
  //   data: {
  //     estimateGas: {
  //       from: '0x41F0CC5A2A84CD0F68ED1667070934542D673ACBD8',
  //       to: '0x4170082243784DCDF3042034E7B044D6D342A91360',
  //       gas: '0x01',
  //       gasPrice: '0x8c',
  //       value: '0x01',
  //       data: '0x70a08231000000000000000000000041f0cc5a2a84cd0f68ed1667070934542d673acbd8',
  //     },
  //   },
  // },
  {
    network: Network.TRON_SHASTA,
    skipEstimateGas: true,
    apiKey: ApiKey.testnet,
  },
  {
    network: Network.KLAYTN,
  },
  {
    network: Network.KLAYTN_BAOBAB,
    apiKey: ApiKey.testnet,
  },
  {
    network: Network.AVALANCHE_C,
  },
  // {
  //   network: Network.AVALANCHE_C_TESTNET,
  //   apiKey: process.env.V3_API_KEY_TESTNET,
  // },
  {
    network: Network.XINFIN,
  },
  // { network: Network.CRONOS },
  { network: Network.CRONOS_TESTNET, apiKey: ApiKey.testnet },
  // { network: Network.BASE },
  { network: Network.ZK_SYNC, url: 'https://mainnet.era.zksync.io' },
  { network: Network.ZK_SYNC_TESTNET, url: 'https://sepolia.era.zksync.dev' },
]

describe.each(testNetworks)('RPC EVM', (testNetwork) => {
  const { network } = testNetwork
  describe(network, () => {
    EvmE2eUtils.e2e(testNetwork)
  })
})
