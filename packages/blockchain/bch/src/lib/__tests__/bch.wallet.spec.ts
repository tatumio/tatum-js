import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA, walletTestFactory } from '@tatumio/shared-testing-common'
import { TatumBchSDK } from '../bch.sdk'

describe('TatumBchSDK - wallet', () => {
  const sdk = TatumBchSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const testData = TEST_DATA.BCH

  describe('Wallet', () => {
    describe('Generate wallet', () => {
      walletTestFactory.generateBlockchainWallet(sdk.wallet, testData)
    })

    describe('Address from XPUB', () => {
      walletTestFactory.generateAddressFromXpub(sdk.wallet, testData)
    })

    describe('Private key from mnemonic', () => {
      walletTestFactory.generatePrivateKeyFromMnemonic(sdk.wallet, testData)
    })

    describe('Address from private key', () => {
      walletTestFactory.generateAddressFromPrivateKey(sdk.wallet, testData)
    })
  })
})
