import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA, WalletTestData, walletTestFactory } from '@tatumio/shared-testing'
import { TatumEthSDK } from './eth.sdk'

const WALLET_TEST_DATA: WalletTestData = {
  ...TEST_DATA.ETH,
  INVALID_XPUB_ERROR: 'Non-base58 character',
  INVALID_XPUB_CHILD_INDEX_ERROR: 'The value of "value" is out of range. It must be >= 0 and <= 4294967295. Received -1',
  INVALID_PRIVATE_KEY_CHILD_INDEX_ERROR: 'The value of "value" is out of range. It must be >= 0 and <= 4294967295. Received -1',
  INVALID_PRIVATE_KEY_ERROR: 'Expected private key to be an Uint8Array with length 32',
}

describe('TatumEthSDK', () => {
  const sdk = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  describe('Wallet', () => {
    describe('Generate wallet', () => {
      walletTestFactory.generateBlockchainWallet(sdk.wallet, WALLET_TEST_DATA)
    })

    describe('Address from XPUB', () => {
      walletTestFactory.generateAddressFromXpub(sdk.wallet, WALLET_TEST_DATA)
    })

    describe('Private key from mnemonic', () => {
      walletTestFactory.generatePrivateKeyFromMnemonic(sdk.wallet, WALLET_TEST_DATA)
    })

    describe('Address from private key', () => {
      walletTestFactory.generateAddressFromPrivateKey(sdk.wallet, WALLET_TEST_DATA)
    })
  })
})
