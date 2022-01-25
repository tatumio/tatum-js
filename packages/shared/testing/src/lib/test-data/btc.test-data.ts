import { BlockchainTestData } from '../shared-testing'

export const BTC_TEST_DATA: BlockchainTestData = {
  MAINNET: {
    XPUB: 'xpub6EvgPCG9vgxentW9pgd7iGUxMchXgvmhDTBdw9oPAT5ye4ZgVfR2kAoppb7PBuktykWwADKef4qGRSzTpF97Z9nrPmLwgVZjPNebKXDwyF1',
    XPUB_REGEX: /xpub6/,
    ADDRESS_0: '1N4U6RidG5XScvBoSNgq5EmHiPxU4MAyEv',
    ADDRESS_100: '19A76Hwfyr29pNTv9wE1m2waz46hzLecYo',
    PRIVATE_KEY_0: 'L27j51mbxeWksCcWLUxUT7MhP4iQWDRsb72seDKNo6yERKPr3vtj',
    PRIVATE_KEY_100: 'L4YQbJRRzULqB2jnk2CbCgGnLMen8DJaQjiqzYw4qyucWM5cbBnQ',
  },
  TESTNET: {
    XPUB: 'tpubDEKXb45q3i1tKQdUsCmG1BfNTHbztHT73q8hCBz6PN93zCKUppXiUsqEW38jvSQzgvYjMzPSGYjH7TPKkjZc5wTHTPSJs2NBJpd4mbos5ZZ',
    XPUB_REGEX: /tpub/,
    ADDRESS_0: 'mt18BbsHM3TfGKF7wzPNo73dpWCbfHWptX',
    ADDRESS_100: 'mpgJj832Nocdn6eftxtFoEv1XRhakfM5x3',
    PRIVATE_KEY_0: 'cNqC7k1rcoLpWeC4t8UTJHUmm9nuNmeJZ2GAuFWirih2RLD8DuMd',
    PRIVATE_KEY_100: 'cPE42nXJCYf5XdHgWB8ZW6CdCRo1VuFwoKwpHNNxLFQcaDC69QkV',
  },
  INVALID_XPUB_ERROR: 'Non-base58 character',
  INVALID_XPUB_CHILD_INDEX_ERROR: 'Expected BIP32Path, got String "-1"',
  INVALID_PRIVATE_KEY_CHILD_INDEX_ERROR: 'Expected UInt32, got Number -1',
  INVALID_PRIVATE_KEY_ERROR: 'Non-base58 character',
}
