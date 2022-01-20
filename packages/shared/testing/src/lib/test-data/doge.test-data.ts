import { BlockchainTestData } from '../shared-testing'

export const DOGE_TEST_DATA: BlockchainTestData = {
  MAINNET: {
    XPUB: 'xpub6F2iRdnWSHLYTZTC9BsoyrobbxgS5T5JXuvmMbM8xKssU7SwfB7ZxuVrodykifiJHEUU7tyQE768kbqf77M2r6JdaBHy3wzH4TDFfqVmK6h',
    ADDRESS_0: 'n36h3pAH7sC3z8KMB47BjbqvW2aJd2oTi7',
    ADDRESS_100: 'DMee7dwgbjns32YJZg8w3QbwcZGaBzKCKA',
    PRIVATE_KEY_0: 'QTEcWfGqd2RbCRuAvoXAz99D8RwENfy8j6X92vPnUKR7yL1kXouk',
    PRIVATE_KEY_100: 'chAohgNcPWYSjPUhG7spHvHAE8yt86QvFmUAPgboFtKb4RnwB1L1',
    XPUB_REGEX: /xpub6/,
  },
  TESTNET: {
    XPUB: 'tpubDEKXb45q3i1tKQdUsCmG1BfNTHbztHT73q8hCBz6PN93zCKUppXiUsqEW38jvSQzgvYjMzPSGYjH7TPKkjZc5wTHTPSJs2NBJpd4mbos5ZZ',
    ADDRESS_0: 'niDS52CjFFZq8uXsaZCkicK4JFRgH7GLj7',
    ADDRESS_100: 'nUPfS5zGfHzehxcReVQR2Jb53ef2i8xQb1',
    PRIVATE_KEY_0: 'cey9JdfjYMY8rjuanh6xmgx8FM6YBmDGF6hbPJfFagUoA5SCxYBM',
    PRIVATE_KEY_100: 'cifcEG11CVMvauPyEXLJXw6VTy3cpivuiRVekE8afRu1LPF1JZCw',
    XPUB_REGEX: /tpub/,
  },
  INVALID_XPUB_ERROR: 'Non-base58 character',
  INVALID_XPUB_CHILD_INDEX_ERROR: 'Expected BIP32Path, got String "-1"',
  INVALID_PRIVATE_KEY_CHILD_INDEX_ERROR: 'Expected UInt32, got Number -1',
  INVALID_PRIVATE_KEY_ERROR: 'Non-base58 character',
}
