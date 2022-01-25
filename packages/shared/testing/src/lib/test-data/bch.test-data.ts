import { BlockchainTestData } from '../shared-testing'

export const BCH_TEST_DATA: BlockchainTestData = {
  MAINNET: {
    XPUB: 'xpub6FCciKxmrMM814skJB7NsSGaduS2RVudDSZ3WCJYdCirjueqWXyTzY3jp4B8NzQgQWFqSwkHKSjEZijqrBpkDqZ8JAamYSBjaZc5637GoEv',
    XPUB_REGEX: /xpub6/,
    ADDRESS_0: 'bitcoincash:qzla5ev0pap3yrvr0t77k4sjerhr8l3a6sh98gqqya',
    ADDRESS_100: 'bitcoincash:qps4cv6gtxh7473qxzcwe6nk90canlt57cd57gpy08',
    PRIVATE_KEY_0: 'L3Jf3gvX1YaCJJTejTfghZ4Sst8GSui6UQctERksAimYCskVH7iG',
    PRIVATE_KEY_100: 'KxgRcHdyYu7pB2a9RvzKiUcrjRa1gnEHVSPjkF84XectyD6vbXSn',
  },
  TESTNET: {
    XPUB: 'tpubDFaFEZnTZdJaGs4bkN6U5Mbwy2XgQtQgm59LrkMgy7UkVCKYakpZ8yia46FuuVMvCQnk4XG9rYZHFuETF3fz7H1RMmL5DxqyAXCUr4PMuMS',
    XPUB_REGEX: /tpub/,
    ADDRESS_0: 'bchtest:qzla5ev0pap3yrvr0t77k4sjerhr8l3a6snhr0zhrp',
    ADDRESS_100: 'bchtest:qps4cv6gtxh7473qxzcwe6nk90canlt57cfx60rngm',
    PRIVATE_KEY_0: 'cTfeWbvNScGTTjvv7sUp4sZWW7Rg7MonYSmMLrDNfqRYTcndpGG3',
    PRIVATE_KEY_100: 'cP3R5Cdpyxp5LU3QpLoT5o7vMesRMEKyZUYCrfaa2mGuDxCQcFDB',
  },
  INVALID_XPUB_ERROR: 'Non-base58 character',
  INVALID_XPUB_CHILD_INDEX_ERROR: `Expected BIP32 derivation path, got String "-1"`,
  INVALID_PRIVATE_KEY_CHILD_INDEX_ERROR: 'Expected UInt32, got Number -1',
  INVALID_PRIVATE_KEY_ERROR: 'Non-base58 character',
}
