import { BlockchainTestData } from '../shared-testing'
import { ETH_TEST_DATA } from './eth.test-data'

export const POLYGON_TEST_DATA: BlockchainTestData = {
  ...ETH_TEST_DATA,
  MAINNET: {
    ...ETH_TEST_DATA.MAINNET,
    XPUB: 'xpub6EoGPf2CXZV6PhvNxGkQAGhfPYBkkBmjpsBLNiA5FjcBs6CgZPNbWoJqgB4p8w8uPTUPZkEGDzskGw7AJrcNCU1Ze7wUBz6s4zSrBF8Af9q',
    PRIVATE_KEY_0: '0x9483c22a4b68745d41500ba87d2a66f7b220790a373116716a83d987cb10b4a6',
    PRIVATE_KEY_100: '0x33ce3dce4140bc780e2721f6ec1f9a9cb6a7f93a49cb769f7d963301f6adc16e',
    ADDRESS_0: '0x914552827a997e033885d380382b64374c7a9c6a',
    ADDRESS_100: '0x4d8fb78b021bf939e9df68cc6f2cf0ccd71beff2',
  },
  TESTNET: {
    ...ETH_TEST_DATA.TESTNET,
    ERC_20: {
      CONTRACT_ADDRESS: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
      PRIVATE_KEY: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
      ADDRESS: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    },
    PROVIDER: 'https://matic-mumbai.chainstacklabs.com/',
  },
}
