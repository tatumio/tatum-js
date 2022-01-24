import { BlockchainTestData } from '../shared-testing'

export const DOGE_TEST_DATA: BlockchainTestData = {
  MAINNET: {
    XPUB: 'xpub6F2iRdnWSHLYTZTC9BsoyrobbxgS5T5JXuvmMbM8xKssU7SwfB7ZxuVrodykifiJHEUU7tyQE768kbqf77M2r6JdaBHy3wzH4TDFfqVmK6h',
    ADDRESS_0: 'DRJhe1poGcuATFj5xwjQLV91CFWEKgUMW8',
    ADDRESS_100: 'D9Br3uXSCSewRv8gpoY8Z4fPEf3aaD2UNg',
    PRIVATE_KEY_0: 'QP4o7cZYmP7XeRU6ewdtnEyDZjuhBadu4Bgj2TtZnCkpmBtQtdCJ',
    PRIVATE_KEY_100: 'QQjiXdvBUqUhkJBc6tavUsq7rE5wr6gNby9MPhHQSjF657TgUrv2',
    XPUB_REGEX: /xpub6/,
  },
  TESTNET: {
    XPUB: 'tpubDEKXb45q3i1tKQdUsCmG1BfNTHbztHT73q8hCBz6PN93zCKUppXiUsqEW38jvSQzgvYjMzPSGYjH7TPKkjZc5wTHTPSJs2NBJpd4mbos5ZZ',
    ADDRESS_0: 'nggL9pTrmQPQuBXHzq41mMbD5WiV6MN331',
    ADDRESS_100: 'ndMWhLdboAYPQxvqwoYtmVTanSDUAHY79K',
    PRIVATE_KEY_0: 'cfzTG4jey7B6TgDbzHGEtdfkG2CD3cBksuWS2ACuqgCSyzcFWTik',
    PRIVATE_KEY_100: 'cgPKB7F6YrVMUfKDcKvM6SPbhJCKAjoQ8DC5QH59KCv38sdd7noY',
    XPUB_REGEX: /tpub/,
  },
  INVALID_XPUB_ERROR: 'Non-base58 character',
  INVALID_XPUB_CHILD_INDEX_ERROR: 'Expected BIP32Path, got String "-1"',
  INVALID_PRIVATE_KEY_CHILD_INDEX_ERROR: 'Expected UInt32, got Number -1',
  INVALID_PRIVATE_KEY_ERROR: 'Non-base58 character',
}
