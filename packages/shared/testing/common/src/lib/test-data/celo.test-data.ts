import { BlockchainTestData } from '../shared-testing'
import { ETH_TEST_DATA } from './eth.test-data'

export const CELO_TEST_DATA: BlockchainTestData = {
  ...ETH_TEST_DATA,
  PROVIDER: 'https://alfajores-forno.celo-testnet.org',
  MAINNET: {
    ...ETH_TEST_DATA.MAINNET,
    XPUB: 'xpub6Eq6pTogWo64mLHHJWadoF8HnZyYLrqK5ivoh2eWHVMxic8Q35rerC8hhgQUqyBwZRq3kwSCyT8eAp5mpyNiHwHKbVUJe6sFQgAbz3PPm45',
    PRIVATE_KEY_0: '0xfc1d28660e7a8a874e846044bf8fcb0d825216300f581fa048cf719c0c6e89fc',
    PRIVATE_KEY_100: '0x163d96bc28ab9d2e9b3660f973f9997d2ee1f98597ff6d48264242d4887aaa12',
    ADDRESS_0: '0xfcbc13e7b22632784d8d65e4c711b07291bc70cb',
    ADDRESS_100: '0xd41f5caafc39bf143849a9ff627dc359d6be769f',
  },
  TESTNET: {
    ...ETH_TEST_DATA.TESTNET,
    MULTITOKEN: {
      CONTRACT_ADDRESS: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      PRIVATE_KEY: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
      ADDRESS: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    },
  },
  BLOCK_HASH: '0xbb3379d078263d38a0b665976b3ba032e2398b8f80d98f6cc4330176966dd328',
  BLOCK_HEIGHT: 11_199_020,
  TX_HASH: '0xadd0d9f75f045d0c4912ef128e5cc2f02efef980c3f9527b77f6e32e27b8c787',
}
