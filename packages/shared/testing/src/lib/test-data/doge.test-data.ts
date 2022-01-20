import { BlockchainTestData } from '../shared-testing'

export const DOGE_TEST_DATA: BlockchainTestData = {
  MAINNET: {
    XPUB: 'xpub6EKTDXEVtTZR3sZoujGEnp9arodxCxHzTrN6G1PEFV7d8bt7CER3fLg8sz8G81LLAkz5C46FCtj4tppA7zd592gs4kCyKvqrMoQK6DQnD5r',
    ADDRESS_0: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
    ADDRESS_100: 'DJKAJhzMzvCezBjfAzdSKrTykbQB5kNCgv',
    PRIVATE_KEY_0: 'QTWSvxHz3FgohMiqfjfZpctvodANr7eQcpjuvdXtw6QRgxFL1PzK',
    PRIVATE_KEY_100: 'chAohgNcPWYSjPUhG7spHvHAE8yt86QvFmUAPgboFtKb4RnwB1L1',
    XPUB_REGEX: /xpub6/,
  },
  TESTNET: {
    XPUB: 'tpubDFjLw3ykn4aB7fFt96FaqRjSnvtDsU2wpVr8GQk3Eo612LS9jo9JgMkQRfYVG248J3pTBsxGg3PYUXFd7pReNLTeUzxFcUDL3zCvrp3H34a',
    ADDRESS_0: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
    ADDRESS_100: 'nUPfS5zGfHzehxcReVQR2Jb53ef2i8xQb1',
    PRIVATE_KEY_0: 'chAohgNcPWYSjPUhG7spHvHAE8yt86QvFmUAPgboFtKb4RnwB1L1',
    PRIVATE_KEY_100: 'cifcEG11CVMvauPyEXLJXw6VTy3cpivuiRVekE8afRu1LPF1JZCw',
    XPUB_REGEX: /tpub/,
  },
  INVALID_XPUB_ERROR: 'Non-base58 character',
  INVALID_XPUB_CHILD_INDEX_ERROR: 'Expected BIP32Path, got String "-1"',
  INVALID_PRIVATE_KEY_CHILD_INDEX_ERROR: 'Expected UInt32, got Number -1',
  INVALID_PRIVATE_KEY_ERROR: 'Non-base58 character',
}
