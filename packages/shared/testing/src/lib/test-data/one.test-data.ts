
import { BlockchainTestData } from '../shared-testing'
import { ETH_TEST_DATA } from './eth.test-data'
import Web3 from 'web3'

export const ONE_TEST_DATA: BlockchainTestData = {
  ...ETH_TEST_DATA,
  MAINNET: {
    ...ETH_TEST_DATA.MAINNET,
    XPUB: 'xpub6ECkfG2sUxabAApSzAcLBFDQHhuEoiwjqmZYW7SRjtaayzNjseQZ3TRQ1agXcSXT5FMb7aEmxhiWGaLEAzhwp8f5RW86E6PJ6rdwNYRRJ1T',
    PRIVATE_KEY_0: '0x763171ee8b7762ceb8c81a877ae1b0c03095074d0ffb060c1df5197681a6550a',
    PRIVATE_KEY_100: '0x8f4b6d6ead76950f1bfc566414699238ad0f964437592c9f3d0aae704b6aaffd',
    ADDRESS_0: '0xfd4c89fcb95560bf827d472bff60b791be7beae0',
    ADDRESS_100: '0x7588a23d0d8f87e2a7c7b0682a50466e5b10dee0',
    CONTRACT_ADDRESS: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    ERC_20: {
      PRIVATE_KEY: '0x0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
      ADDRESS: '0x2627d16dcd27ddb6cf42341756aa6c5a8c6cb954',
    },
  },
}
