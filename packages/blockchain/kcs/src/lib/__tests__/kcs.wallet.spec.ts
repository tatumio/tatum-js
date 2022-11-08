import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA, walletTestFactory } from '@tatumio/shared-testing-common'
import { TatumKcsSDK } from '@tatumio/kcs'

describe('KCS wallet', () => {
  const sdk = TatumKcsSDK({
    apiKey: REPLACE_ME_WITH_TATUM_API_KEY,
  })

  describe('Generate wallet', () => {
    walletTestFactory.generateBlockchainWallet(sdk.wallet, TEST_DATA.KCS)
  })

  describe('Address from XPUB', () => {
    walletTestFactory.generateAddressFromXpub(sdk.wallet, TEST_DATA.KCS)
  })

  describe('Private key from mnemonic', () => {
    walletTestFactory.generatePrivateKeyFromMnemonic(sdk.wallet, TEST_DATA.KCS)
  })

  describe('Address from private key', () => {
    walletTestFactory.generateAddressFromPrivateKey(sdk.wallet, TEST_DATA.KCS)
  })
})
