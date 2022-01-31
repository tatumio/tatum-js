import { BlockchainTestData } from '../shared-testing'
import { ETH_TEST_DATA } from './eth.test-data'

export const BSC_TEST_DATA: BlockchainTestData = {
  ...ETH_TEST_DATA,
  MAINNET: {
    ...ETH_TEST_DATA.MAINNET,
    XPUB: 'xpub6EmVHAqPHkSRgsS7Km6Ynmjg4Kup6aD2NjX1zmVEwuwvJZPGefgmmg5a36eBX8QZpfhtPu7qHgcMmehDMLivrm8gY2L7v8iQDmxyYVhxPUs',
    PRIVATE_KEY_0: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    PRIVATE_KEY_100: '0x01c0a301a5387999ecd48f05c2485f895463332e503db22ac09361bae6af4dd5',
    ADDRESS_0: '0xb9e379f99ca17a5009471bd2e8194123ec9eb497',
    ADDRESS_100: '0xc6776c6230adf9216646da8f68c9863493cf81df',
    ERC_20: {
      PRIVATE_KEY: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      ADDRESS: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    },
  },
  BLOCK_HASH: '0x635755346ca10c9d95fef3238d8466d2aa1adb9e2f878287b1dd5567fc314c2f',
  BLOCK_HEIGHT: 14_826_647,
  TX_HASH: '0xec1b50f8b708d1b5f122af3171123ffdc5748568c272370709ad60a320a5e635',
}
