import { BlockchainTestData } from '../shared-testing'
import { ETH_TEST_DATA } from './eth.test-data'

export const ONE_TEST_DATA: BlockchainTestData = {
  ...ETH_TEST_DATA,
  MAINNET: {
    ...ETH_TEST_DATA.MAINNET,
    XPUB: 'xpub6ECkfG2sUxabAApSzAcLBFDQHhuEoiwjqmZYW7SRjtaayzNjseQZ3TRQ1agXcSXT5FMb7aEmxhiWGaLEAzhwp8f5RW86E6PJ6rdwNYRRJ1T',
    PRIVATE_KEY_0: '0x763171ee8b7762ceb8c81a877ae1b0c03095074d0ffb060c1df5197681a6550a',
    PRIVATE_KEY_100: '0x8f4b6d6ead76950f1bfc566414699238ad0f964437592c9f3d0aae704b6aaffd',
    ADDRESS_0: '0xfd4c89fcb95560bf827d472bff60b791be7beae0',
    ADDRESS_100: '0x7588a23d0d8f87e2a7c7b0682a50466e5b10dee0',
  },
  BLOCK_HASH: '0x92bc4ed1d484e3babb490e36cf436d12a8236d92caabc12d1dbbc8d02eacc265',
  BLOCK_HEIGHT: 22_366_731,
  TX_HASH: '0xca22bfc703db8b4176007938f5ffd5277efd95a83f50b86e9499a76b27da78ac',
}
