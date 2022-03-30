import { TatumBtcSDK } from '../btc.sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA, walletTestFactory } from '@tatumio/shared-testing-common'

describe('TatumBtcSDK - wallet', () => {
  const sdk = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  describe('Wallet', () => {
    describe('Generate wallet', () => {
      walletTestFactory.generateBlockchainWallet(sdk.wallet, TEST_DATA.BTC)
    })

    describe('Address from XPUB', () => {
      walletTestFactory.generateAddressFromXpubBtc(sdk.wallet, TEST_DATA.BTC)
    })

    describe('Private key from mnemonic', () => {
      walletTestFactory.generatePrivateKeyFromMnemonic(sdk.wallet, TEST_DATA.BTC)
    })

    describe('Address from private key', () => {
      walletTestFactory.generateAddressFromPrivateKey(sdk.wallet, TEST_DATA.BTC)
    })
  })
})
