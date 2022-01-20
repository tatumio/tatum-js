import { BlockchainTestData } from '../shared-testing'

export const LTC_TEST_DATA: BlockchainTestData = {
  MAINNET: {
    XPUB: 'Ltub2aXe9g8RPgAcY6jb6FftNJfQXHMV6UNBeZwrWH1K3vjpua9u8uj95xkZyCC4utdEbfYeh9TwxcUiFy2mGzBCJVBwW3ezHmLX2fHxv7HUt8J',
    XPUB_REGEX: /Ltub/,
    ADDRESS_0: 'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b',
    ADDRESS_100: 'LYkdm7x4SCLePTi9AQfnvxRqKQfiwWp5pt',
    PRIVATE_KEY_0: 'T63MUovVt5GN5rmfwYMr4M6YqFmisjbrZrfZYZ53qWmCwiP6xCHa',
    PRIVATE_KEY_100: 'T4XVzDmb8UG2y7YzGzAv87VA27jGRuKhioczbTtyao4qhEWfQSoL',
  },
  TESTNET: {
    XPUB: 'ttub4giastL5S3AicjXRBEJt7uq22b611rJvVfTgJSRfYeyZkwXwKnZcctK3tEjMpqrgiNSnYAzkKPJDxGoKNWQzkzTJxSryHbaYxsYW9Vr6AYQ',
    XPUB_REGEX: /ttub/,
    ADDRESS_0: 'mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5',
    ADDRESS_100: 'mmsuitZd9izQe46VhqrXuaKSAqP9jS5QKn',
    PRIVATE_KEY_0: 'cMotAJwwC3hruht3gYKBBLm9kUhEWvfovDTLGPy4biyNbR2VBXLG',
    PRIVATE_KEY_100: 'cQ1YZMep3CiAnMTA9y62ha6BjGaaTFsTvtDuGmucGvpAVmS89khV',
  },
  INVALID_XPUB_ERROR: 'Non-base58 character',
  INVALID_XPUB_CHILD_INDEX_ERROR: 'Expected BIP32Path, got String "-1"',
  INVALID_PRIVATE_KEY_CHILD_INDEX_ERROR: 'Expected UInt32, got Number -1',
  INVALID_PRIVATE_KEY_ERROR: 'Non-base58 character',
}
