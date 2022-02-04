import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA, walletTestFactory } from '@tatumio/shared-testing-common'
import { TatumDogeSDK } from '../doge.sdk'

describe('Doge - Wallet', () => {
  const sdk = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  describe('Generate wallet', () => {
    walletTestFactory.generateBlockchainWallet(sdk.wallet, TEST_DATA.DOGE)
  })

  describe('Address from XPUB', () => {
    walletTestFactory.generateAddressFromXpub(sdk.wallet, TEST_DATA.DOGE)
  })

  describe('Private key from mnemonic', () => {
    walletTestFactory.generatePrivateKeyFromMnemonic(sdk.wallet, TEST_DATA.DOGE)
  })

  describe('Address from private key', () => {
    walletTestFactory.generateAddressFromPrivateKey(sdk.wallet, TEST_DATA.DOGE)
  })
})
