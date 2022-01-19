import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA, WalletTestData, walletTestFactory } from '@tatumio/shared-testing'
import { TatumBtcSDK } from './btc.sdk'

const WALLET_TEST_DATA: WalletTestData = {
  ...TEST_DATA.BTC,
  INVALID_XPUB_ERROR: 'Non-base58 character',
  INVALID_XPUB_CHILD_INDEX_ERROR: 'Expected BIP32Path, got String "-1"',
  INVALID_PRIVATE_KEY_CHILD_INDEX_ERROR: 'Expected UInt32, got Number -1',
  INVALID_PRIVATE_KEY_ERROR: 'Non-base58 character',
}

describe('TatumBtcSDK', () => {
  const sdk = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

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
