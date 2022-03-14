import { TatumFlowSDK } from './flow.sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA, walletTestFactory } from '@tatumio/shared-testing-common'

describe('TatumFlowSDK', () => {
  const sdk = TatumFlowSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  describe('Wallet', () => {
    describe('Generate wallet', () => {
      walletTestFactory.generateBlockchainWallet(sdk.wallet, TEST_DATA.FLOW)
    })

    describe('Address from XPUB', () => {
      walletTestFactory.generateAddressFromXpub(sdk.wallet, TEST_DATA.FLOW)
    })

    describe('Private key from mnemonic', () => {
      walletTestFactory.generatePrivateKeyFromMnemonic(sdk.wallet, TEST_DATA.FLOW)
    })

    describe('Address from private key', () => {
      it('valid', async () => {
        const address0 = sdk.wallet.generateAddressFromPrivateKey(TEST_DATA.FLOW.MAINNET.PRIVATE_KEY_0)
        expect(address0).toBe(TEST_DATA.FLOW.MAINNET.ADDRESS_0)

        const address100 = sdk.wallet.generateAddressFromPrivateKey(TEST_DATA.FLOW.MAINNET.PRIVATE_KEY_100)
        expect(address100).toBe(TEST_DATA.FLOW.MAINNET.ADDRESS_100)
      })

      // walletTestFactory.generateAddressFromPrivateKey(sdk.wallet, TEST_DATA.FLOW)
    })
  })
})
