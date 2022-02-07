import { BlockchainTestData } from '../shared-testing'

export const SCRYPTA_TEST_DATA: BlockchainTestData = {
  MAINNET: {
    XPUB: 'xpub6Eq7GpGb8Ueng9EJpCmW8gExMe6RLDHWYHcHmBZfPrwJesnWQVGavPEME5y555GAW2X62sYi4pFrEJVG7xi72MLQ8FzbppyCGcWabYpdXwZ',
    XPUB_REGEX: /xpub6/,
    ADDRESS_0: 'LPsGzeqiHmoXBTLNEBHtbDC3DCuisYM5Tr',
    ADDRESS_100: 'LPmdHVgA2VX51vMNEQKMAW2kHGsHvT8zbb',
    PRIVATE_KEY_0: 'Skdyx8Cpz5XnFnqtAbi4gG1X5cXfkJ2uqvx7dcAuHDzkyTjnFR97',
    PRIVATE_KEY_100: 'Sr1RMRgwcpibzhsQKKsd7GN3ZbqRL5JbUwgbsdofS9qexE61BN55',
  },
  TESTNET: {
    XPUB: 'tpubDFCjo46GqkcEwwRAGPkbLbaKgmC5Kbna5vCb7jcojmhCQATDUi7g4puBU83rbaDQHw3zeT4abv5tvUysWpZLunnhBrjuWMdRra6zMdN83XP',
    XPUB_REGEX: /tpub/,
    ADDRESS_0: 'tBZvnEPUP2QjnhMDAKc4u7hBw4GF3XZ4LR',
    ADDRESS_100: 'tBUH55Dv7k8HdANDAYdXUQXu18Dp7GWkEH',
    PRIVATE_KEY_0: 'Skdyx8Cpz5XnFnqtAbi4gG1X5cXfkJ2uqvx7dcAuHDzkyTjnFR97',
    PRIVATE_KEY_100: 'Sr1RMRgwcpibzhsQKKsd7GN3ZbqRL5JbUwgbsdofS9qexE61BN55',
  },
  BLOCK_HASH: '63f64ec41797790ca909ca734faf56d9abebe41b41d6d0e2ffafb72a4fe660a2',
  BLOCK_HEIGHT: 1_615_945,
  TX_HASH: '6cf31ea274ccd29243494c1f70f31dd67a773d12916d44e56d2a84efd44df13b',
  INVALID_XPUB_ERROR: 'Non-base58 character',
  INVALID_XPUB_CHILD_INDEX_ERROR: 'Expected BIP32Path, got String "-1"',
  INVALID_PRIVATE_KEY_CHILD_INDEX_ERROR: 'Expected UInt32, got Number -1',
  INVALID_PRIVATE_KEY_ERROR: 'Non-base58 character',
}
