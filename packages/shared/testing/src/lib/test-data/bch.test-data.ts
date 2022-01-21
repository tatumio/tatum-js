import { BlockchainTestData } from '../shared-testing'

export const BCH_TEST_DATA: BlockchainTestData = {
  MAINNET: {
    XPUB: 'xpub6FCciKxmrMM814skJB7NsSGaduS2RVudDSZ3WCJYdCirjueqWXyTzY3jp4B8NzQgQWFqSwkHKSjEZijqrBpkDqZ8JAamYSBjaZc5637GoEv',
    XPUB_REGEX: /xpub6/,
    ADDRESS_0: 'qp2zxm22u4w58fv5clalw03p5mz2uzfdnvy3axm6z4',
    ADDRESS_100: 'qps4cv6gtxh7473qxzcwe6nk90canlt57cd57gpy08',
    PRIVATE_KEY_0: 'KzwLkKV24T2fzbGRTRuTBfUjm6LAgVb4P6PNQMBMfqHbAFkt5W8G',
    PRIVATE_KEY_100: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
  },
  TESTNET: {
    XPUB: 'tpubDFaFEZnTZdJaGs4bkN6U5Mbwy2XgQtQgm59LrkMgy7UkVCKYakpZ8yia46FuuVMvCQnk4XG9rYZHFuETF3fz7H1RMmL5DxqyAXCUr4PMuMS',
    XPUB_REGEX: /tpub/,
    ADDRESS_0: 'qp2zxm22u4w58fv5clalw03p5mz2uzfdnvqreped9f',
    ADDRESS_100: 'qps4cv6gtxh7473qxzcwe6nk90canlt57cfx60rngm',
    PRIVATE_KEY_0: 'cRJLDEUsVWiwA2jgqqiaYyyoPKdaLwgkT8XqWmdsAwwbQzpidE6t',
    PRIVATE_KEY_100: 'cRCLa2kAZ4XpSF62HaqbBEWKA2aVquTGX5sRmFuu2SpZ4s72vi5Y',
  },
  INVALID_XPUB_ERROR: 'Non-base58 character',
  INVALID_XPUB_CHILD_INDEX_ERROR: 'Expected BIP32Path, got String "-1"',
  INVALID_PRIVATE_KEY_CHILD_INDEX_ERROR: 'Expected UInt32, got Number -1',
  INVALID_PRIVATE_KEY_ERROR: 'Non-base58 character',
}
