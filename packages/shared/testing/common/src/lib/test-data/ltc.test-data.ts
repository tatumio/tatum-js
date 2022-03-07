import { BlockchainTestData } from '../shared-testing'

export const LTC_TEST_DATA: BlockchainTestData = {
  MAINNET: {
    XPUB: 'Ltub2b72QJgc19tskcnVsaw1fRMpRhG5hamSP2wgKWWpEJ4ik3JsDqv2vU2XJuKk8nVKbAyV63Pko38N8BW76GtfdhvFTtngobwQKbPo2m5R4BA',
    XPUB_REGEX: /Ltub/,
    ADDRESS_0: 'LNzwQ65j1jZM42T2n6bcr74kFgcaaHQvf5',
    ADDRESS_100: 'Lf6cgyhQbMVTXjfoJuavXgxjjaZRKWXypy',
    PRIVATE_KEY_0: 'T61de4eW7crexnVmhRrddbXQfU8Av3t97RKZBKUWoaiWtBymQxrJ',
    PRIVATE_KEY_100: 'T642kncQtx283XhjSFBPskQcCFGEDyEeofuY1ipRs3X1Xu6a5mAS',
  },
  TESTNET: {
    XPUB: 'ttub4fJmXtS9hgcRpUu1uLpZHfkwgwon2fj5izkFEDfihE2cioRGQox2RQPsxcKcVGDZ7FB4iHRuutdxbCw21RYxUbSwvqM2Y9jQDhxe4CN1waq',
    XPUB_REGEX: /ttub/,
    ADDRESS_0: 'mt18BbsHM3TfGKF7wzPNo73dpWCbfHWptX',
    ADDRESS_100: 'mpgJj832Nocdn6eftxtFoEv1XRhakfM5x3',
    PRIVATE_KEY_0: 'cNqC7k1rcoLpWeC4t8UTJHUmm9nuNmeJZ2GAuFWirih2RLD8DuMd',
    PRIVATE_KEY_100: 'cPE42nXJCYf5XdHgWB8ZW6CdCRo1VuFwoKwpHNNxLFQcaDC69QkV',
  },
  BLOCK_HASH: '1fa8b4dc6612c07bcafeb7b2c34931b224e969f860b1a9606fe5b341928ec490',
  BLOCK_HEIGHT: 2_121_413,
  TX_HASH: '5e878df3e6308cd35f4da52075b4107ce57b74fff3f24815cfe0362f6034a81f',
  INVALID_XPUB_ERROR: 'Non-base58 character',
  INVALID_XPUB_CHILD_INDEX_ERROR: 'Expected BIP32Path, got String "-1"',
  INVALID_PRIVATE_KEY_CHILD_INDEX_ERROR: 'Expected UInt32, got Number -1',
  INVALID_PRIVATE_KEY_ERROR: 'Non-base58 character',
}
