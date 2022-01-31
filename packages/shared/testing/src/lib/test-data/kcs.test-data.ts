import { BlockchainTestData } from '../shared-testing'
import { ETH_TEST_DATA } from './eth.test-data'

export const KCS_TEST_DATA: BlockchainTestData = {
  ...ETH_TEST_DATA,
  MAINNET: {
    ...ETH_TEST_DATA.MAINNET,
    XPUB: 'xpub6EmVHAqPHkSRgsS7Km6Ynmjg4Kup6aD2NjX1zmVEwuwvJZPGefgmmg5a36eBX8QZpfhtPu7qHgcMmehDMLivrm8gY2L7v8iQDmxyYVhxPUs',
    PRIVATE_KEY_0: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    PRIVATE_KEY_100: '0x01c0a301a5387999ecd48f05c2485f895463332e503db22ac09361bae6af4dd5',
    ADDRESS_0: '0xb9e379f99ca17a5009471bd2e8194123ec9eb497',
    ADDRESS_100: '0xc6776c6230adf9216646da8f68c9863493cf81df',
  },
  BLOCK_HASH: '0xbf1d59d3e95aa8f03138588a0c5d211ae91a7e00273580df6c17b432b2adff67',
  BLOCK_HEIGHT: 7_009_962,
  TX_HASH: '0x43b35eee3ef3efb975a14625a893ed4b4ec39365e2927cddc0fe8003b5b9f012',
}
