import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA, walletTestFactory } from '@tatumio/shared-testing-common'
import { TatumAdaSDK } from './ada.sdk'

describe('TatumAdaSDK', () => {
  const sdk = TatumAdaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const testData = TEST_DATA.ADA.TESTNET

  jest.setTimeout(99999)

  describe('Wallet', () => {
    describe('Generate wallet', () => {
      it('valid input mnemonic', async () => {
        const { mnemonic, xpub } = await sdk.wallet.generateBlockchainWallet(TEST_DATA.MNEMONIC)
        expect(mnemonic).toBe(TEST_DATA.MNEMONIC)
        expect(xpub).toBe(testData.XPUB)
      })

      it('invalid input mnemonic', async () => {
        const wrongMnemonic = 'wrongmnemonic'
        expect(async () => await sdk.wallet.generateBlockchainWallet(wrongMnemonic)).rejects.toThrow(
          TEST_DATA.ADA.INVALUD_MNEMONIC_ERROR,
        )
      })
    })

    describe('Address from XPUB', () => {
      it('valid', async () => {
        const address = await sdk.wallet.generateAddressFromXPub(testData.XPUB, 0, true)
        expect(address).toBe(testData.ADDRESS)
      })

      it('invalid child index', async () => {
        await expect(
          async () => await sdk.wallet.generateAddressFromXPub(TEST_DATA.MNEMONIC, -1),
        ).rejects.toThrow(TEST_DATA.ADA.INVALID_PRIVATE_KEY_CHILD_INDEX_ERROR)
      })
    })

    describe('Private key from mnemonic', () => {
      const givenMnemonic = TEST_DATA.MNEMONIC
      it('valid', async () => {
        const privateKey = await sdk.wallet.generatePrivateKeyFromMnemonic(givenMnemonic, 0)
        expect(privateKey).toBe(testData.PRIVATE_KEY)
      })
    })

    describe('Wallet without mnemonic', () => {
      it('valid', async () => {
        const { mnemonic, xpub } = await sdk.wallet.generateWallet()
        expect(mnemonic.length).toBeGreaterThan(0)
        expect(xpub).toBeDefined()
      })
    })
  })
})
