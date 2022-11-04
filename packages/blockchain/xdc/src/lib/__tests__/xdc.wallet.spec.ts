import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA, walletTestFactory } from '@tatumio/shared-testing-common'
import { TatumXdcSDK } from '@tatumio/xdc'

describe('XDC wallet', () => {
  const sdk = TatumXdcSDK({
    apiKey: REPLACE_ME_WITH_TATUM_API_KEY,
  })

  describe('Generate wallet', () => {
    walletTestFactory.generateBlockchainWallet(sdk.wallet, TEST_DATA.XDC)
  })

  describe('Address from XPUB', () => {
    walletTestFactory.generateAddressFromXpub(sdk.wallet, TEST_DATA.XDC)
  })

  describe('Private key from mnemonic', () => {
    walletTestFactory.generatePrivateKeyFromMnemonic(sdk.wallet, TEST_DATA.XDC)
  })

  describe('Address from private key', () => {
    walletTestFactory.generateAddressFromPrivateKey(sdk.wallet, TEST_DATA.XDC)
  })
})
