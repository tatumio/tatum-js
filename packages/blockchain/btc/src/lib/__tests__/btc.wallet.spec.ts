import { TatumBtcSDK } from '../btc.sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA, walletTestFactory } from '@tatumio/shared-testing-common'

describe('TatumBtcSDK - wallet', () => {
  const sdk = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  describe('Wallet', () => {
    describe('Generate wallet', () => {
      walletTestFactory.generateBlockchainWallet(sdk.wallet, TEST_DATA.BTC)
    })

    describe('Address from XPUB', () => {
      describe('mainnet', () => {
        it.each([
          [0, TEST_DATA.BTC.MAINNET.BECH32_ADDRESS_0],
          [100, TEST_DATA.BTC.MAINNET.BECH32_ADDRESS_100],
        ])('index %s', async (idx: number, expectedAddress: string) => {
          const address = sdk.wallet.generateAddressFromXPub(TEST_DATA.BTC.MAINNET.XPUB, idx)
          expect(address).toBe(expectedAddress)
        })

        it.each([
          ['xpub', 'invalid xpub', 1, TEST_DATA.BTC.INVALID_XPUB_ERROR],
          ['child index', TEST_DATA.BTC.MAINNET.XPUB, -1, TEST_DATA.BTC.INVALID_XPUB_CHILD_INDEX_ERROR],
        ])('invalid arg %s', (_: string, xpub: string, childIndex: number, errorMessage: string) => {
          expect(() => {
            sdk.wallet.generateAddressFromXPub(xpub, childIndex, undefined)
          }).toThrow(errorMessage)
        })
      })

      describe('testnet', () => {
        it.each([
          [0, TEST_DATA.BTC.TESTNET.BECH32_ADDRESS_0],
          [100, TEST_DATA.BTC.TESTNET.BECH32_ADDRESS_100],
        ])('index %s', async (idx: number, expectedAddress: string) => {
          const address = sdk.wallet.generateAddressFromXPub(TEST_DATA.BTC.TESTNET.XPUB, idx, {
            testnet: true,
          })
          expect(address).toBe(expectedAddress)
        })

        it.each([
          ['xpub', 'invalid xpub', 1, TEST_DATA.BTC.INVALID_XPUB_ERROR],
          ['child index', TEST_DATA.BTC.TESTNET.XPUB, -1, TEST_DATA.BTC.INVALID_XPUB_CHILD_INDEX_ERROR],
        ])('invalid arg %s', (_: string, xpub: string, childIndex: number, errorMessage: string) => {
          expect(() => {
            sdk.wallet.generateAddressFromXPub(xpub, childIndex, { testnet: true })
          }).toThrow(errorMessage)
        })
      })
    })

    describe('Private key from mnemonic', () => {
      walletTestFactory.generatePrivateKeyFromMnemonic(sdk.wallet, TEST_DATA.BTC)
    })

    describe('Address from private key', () => {
      walletTestFactory.generateAddressFromPrivateKey(sdk.wallet, TEST_DATA.BTC)
    })
  })
})
