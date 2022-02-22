import { BlockchainTestData } from '../shared-testing'
import { ETH_TEST_DATA } from './eth.test-data'

export const BSC_TEST_DATA: BlockchainTestData = {
  ...ETH_TEST_DATA,
  PROVIDER: 'https://data-seed-prebsc-1-s2.binance.org:8545/',
  MAINNET: {
    ...ETH_TEST_DATA.MAINNET,
    XPUB: 'xpub6EmVHAqPHkSRgsS7Km6Ynmjg4Kup6aD2NjX1zmVEwuwvJZPGefgmmg5a36eBX8QZpfhtPu7qHgcMmehDMLivrm8gY2L7v8iQDmxyYVhxPUs',
    PRIVATE_KEY_0: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    PRIVATE_KEY_100: '0x01c0a301a5387999ecd48f05c2485f895463332e503db22ac09361bae6af4dd5',
    ADDRESS_0: '0xb9e379f99ca17a5009471bd2e8194123ec9eb497',
    ADDRESS_100: '0xc6776c6230adf9216646da8f68c9863493cf81df',
  },
  TESTNET: {
    ...ETH_TEST_DATA.TESTNET,
    ERC_20: {
      CONTRACT_ADDRESS: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
      PRIVATE_KEY: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
      ADDRESS: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    },
    MULTITOKEN: {
      CONTRACT_ADDRESS: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      PRIVATE_KEY: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
      ADDRESS: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    },
    SMART_CONTRACT: {
      CONTRACT_ADDRESS: '0xd7d3e5e2174b530fdfb6d680c07c8b34495e2195',
      PRIVATE_KEY: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
    },
    CUSTODIAL: {
      PRIVATE_KEY: '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab',
      SIGNATURE_ID: '695a3b3e-649f-4e5b-9524-c388c4f45230',
      CONTRACT_ADDRESS: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
      TOKEN_ADDRESS: '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867',
    },
    ERC_721: {
      CONTRACT_ADDRESS: '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc',
      PRIVATE_KEY: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
    },
    PROVIDER: 'https://data-seed-prebsc-1-s2.binance.org:8545/',
    SERIALIZED_TX:
      '{"from":0,"to":"0x687422eEA2cB73B5d3e242bA5456b782919AFc85","data":"0x731133e9000000000000000000000000687422eea2cb73b5d3e242ba5456b782919afc8500000000000000000000000000000000000000000000000000000000000186a000000000000000000000000000000000000000000000000000000000000186a0000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000021234000000000000000000000000000000000000000000000000000000000000","nonce":58604750,"gasPrice":"20000000000"}',
  },
  BLOCK_HASH: '0x635755346ca10c9d95fef3238d8466d2aa1adb9e2f878287b1dd5567fc314c2f',
  BLOCK_HEIGHT: 14_826_647,
  TX_HASH: '0xec1b50f8b708d1b5f122af3171123ffdc5748568c272370709ad60a320a5e635',
}
