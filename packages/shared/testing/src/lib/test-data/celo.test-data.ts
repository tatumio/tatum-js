import { BlockchainTestData } from '../shared-testing'
import { ETH_TEST_DATA } from './eth.test-data'

export const CELO_TEST_DATA: BlockchainTestData = {
  ...ETH_TEST_DATA,
  MAINNET: {
    ...ETH_TEST_DATA.MAINNET,
    XPUB: 'xpub6Eq6pTogWo64mLHHJWadoF8HnZyYLrqK5ivoh2eWHVMxic8Q35rerC8hhgQUqyBwZRq3kwSCyT8eAp5mpyNiHwHKbVUJe6sFQgAbz3PPm45',
    PRIVATE_KEY_0: '0xfc1d28660e7a8a874e846044bf8fcb0d825216300f581fa048cf719c0c6e89fc',
    PRIVATE_KEY_100: '0x163d96bc28ab9d2e9b3660f973f9997d2ee1f98597ff6d48264242d4887aaa12',
    ADDRESS_0: '0xfcbc13e7b22632784d8d65e4c711b07291bc70cb',
    ADDRESS_100: '0xd41f5caafc39bf143849a9ff627dc359d6be769f',
  },
}