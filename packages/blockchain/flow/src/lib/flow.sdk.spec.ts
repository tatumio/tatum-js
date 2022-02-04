import { TatumFlowSDK } from './flow.sdk'
import {
  BlockchainTestData,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  walletTestFactory,
} from '@tatumio/shared-testing'
import { SdkWithWalletFunctions } from '@tatumio/shared-blockchain-abstract'

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
      walletTestFactory.generateAddressFromPrivateKey = (
        sdk: SdkWithWalletFunctions,
        testData: BlockchainTestData,
      ) => {
        describe('mainnet', () => {
          it('valid', async () => {
            const address0 = sdk.generateAddressFromPrivateKey(testData.MAINNET.PRIVATE_KEY_0)
            expect(address0).toBe(testData.MAINNET.ADDRESS_0)

            const address100 = sdk.generateAddressFromPrivateKey(testData.MAINNET.PRIVATE_KEY_100)
            expect(address100).toBe(testData.MAINNET.ADDRESS_100)
          })
        })

        describe('testnet', () => {
          it('testnet', async () => {
            const address0 = sdk.generateAddressFromPrivateKey(testData.TESTNET.PRIVATE_KEY_0, {
              testnet: true,
            })
            expect(address0).toBe(testData.TESTNET.ADDRESS_0)

            const address100 = sdk.generateAddressFromPrivateKey(testData.TESTNET.PRIVATE_KEY_100, {
              testnet: true,
            })
            expect(address100).toBe(testData.TESTNET.ADDRESS_100)
          })
        })
      }
      walletTestFactory.generateAddressFromPrivateKey(sdk.wallet, TEST_DATA.FLOW)
    })
  })
})
