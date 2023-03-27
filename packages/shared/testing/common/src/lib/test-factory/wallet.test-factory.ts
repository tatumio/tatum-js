import { Wallet } from '@tatumio/api-client'
import 'jest/index'
import { BlockchainTestData, TEST_DATA } from '../shared-testing'

interface SdkWithWalletFunctions {
  generateAddressFromXPub(xpub: string, i: number, options?: { testnet: boolean }): string

  generatePrivateKeyFromMnemonic(mnemonic: string, i: number, options?: { testnet: boolean }): Promise<string>

  generateAddressFromPrivateKey(privateKey: string, options?: { testnet: boolean }): string

  generateWallet(mnemonic?: string, options?: { testnet: boolean }): Promise<Wallet>
}

export const walletTestFactory = {
  generateBlockchainWallet: (
    sdk: SdkWithWalletFunctions,
    testData: BlockchainTestData,
    givenMnemonic = TEST_DATA.MNEMONIC,
    skipInvalidMnemonic = false,
  ) => {
    describe('mainnet', () => {
      it('valid', async () => {
        const { mnemonic, xpub } = await sdk.generateWallet(givenMnemonic)
        expect(mnemonic).toBe(TEST_DATA.MNEMONIC)
        expect(xpub).toBe(testData.MAINNET.XPUB)
      })

      it('without input mnemonic', async () => {
        const { mnemonic, xpub } = await sdk.generateWallet()
        expect(mnemonic.length).toBeGreaterThan(0)
        expect(xpub).toMatch(testData.MAINNET.XPUB_REGEX)
      })

      it('invalid input mnemonic', async () => {
        const wrongMnemonic = 'wrongmnemonic'

        const { mnemonic, xpub } = await sdk.generateWallet(wrongMnemonic)
        expect(mnemonic).toBe(wrongMnemonic)
        expect(xpub).toMatch(testData.MAINNET.XPUB_REGEX)
      })
    })

    describe('testnet', () => {
      it('valid', async () => {
        const { mnemonic, xpub } = await sdk.generateWallet(givenMnemonic, { testnet: true })
        expect(mnemonic).toBe(TEST_DATA.MNEMONIC)
        expect(xpub).toBe(testData.TESTNET.XPUB)
      })

      it('without input mnemonic', async () => {
        const { mnemonic, xpub } = await sdk.generateWallet(undefined, {
          testnet: true,
        })
        expect(mnemonic.length).toBeGreaterThan(0)
        expect(xpub).toMatch(testData.TESTNET.XPUB_REGEX)
      })

      it('invalid input mnemonic', async () => {
        const wrongMnemonic = 'wrongmnemonic'

        const { mnemonic, xpub } = await sdk.generateWallet(wrongMnemonic, {
          testnet: true,
        })
        expect(mnemonic).toBe(wrongMnemonic)
        expect(xpub).toMatch(testData.TESTNET.XPUB_REGEX)
      })
    })
  },
  generateAddressFromXpub: (sdk: SdkWithWalletFunctions, testData: BlockchainTestData) => {
    describe('mainnet', () => {
      it.each([
        [0, testData.MAINNET.ADDRESS_0],
        [100, testData.MAINNET.ADDRESS_100],
      ])('index %s', async (idx: number, expectedAddress: string) => {
        const address = sdk.generateAddressFromXPub(testData.MAINNET.XPUB, idx)
        expect(address).toBe(expectedAddress)
      })

      it.each([
        ['xpub', 'invalid xpub', 1, testData.INVALID_XPUB_ERROR],
        ['child index', testData.MAINNET.XPUB, -1, testData.INVALID_XPUB_CHILD_INDEX_ERROR],
      ])('invalid arg %s', (_: string, xpub: string, childIndex: number, errorMessage: string) => {
        expect(() => {
          sdk.generateAddressFromXPub(xpub, childIndex)
        }).toThrow(errorMessage)
      })
    })

    describe('testnet', () => {
      it.each([
        [0, testData.TESTNET.ADDRESS_0],
        [100, testData.TESTNET.ADDRESS_100],
      ])('index %s', async (idx: number, expectedAddress: string) => {
        const address = sdk.generateAddressFromXPub(testData.TESTNET.XPUB, idx, { testnet: true })
        expect(address).toBe(expectedAddress)
      })

      it.each([
        ['xpub', 'invalid xpub', 1, testData.INVALID_XPUB_ERROR],
        ['child index', testData.TESTNET.XPUB, -1, testData.INVALID_XPUB_CHILD_INDEX_ERROR],
      ])('invalid arg %s', (_: string, xpub: string, childIndex: number, errorMessage: string) => {
        expect(() => {
          sdk.generateAddressFromXPub(xpub, childIndex, { testnet: true })
        }).toThrow(errorMessage)
      })
    })
  },
  generatePrivateKeyFromMnemonic: (
    sdk: SdkWithWalletFunctions,
    testData: BlockchainTestData,
    givenMnemonic = TEST_DATA.MNEMONIC,
  ) => {
    describe('mainnet', () => {
      it('valid', async () => {
        const privateKey0 = await sdk.generatePrivateKeyFromMnemonic(givenMnemonic, 0)
        expect(privateKey0).toBe(testData.MAINNET.PRIVATE_KEY_0)

        const privateKey100 = await sdk.generatePrivateKeyFromMnemonic(givenMnemonic, 100)
        expect(privateKey100).toBe(testData.MAINNET.PRIVATE_KEY_100)
      })

      it('invalid child index', async () => {
        await expect(async () => sdk.generatePrivateKeyFromMnemonic(givenMnemonic, -1)).rejects.toThrow(
          testData.INVALID_PRIVATE_KEY_CHILD_INDEX_ERROR,
        )
      })
    })

    describe('testnet', () => {
      it('valid', async () => {
        const privateKey0 = await sdk.generatePrivateKeyFromMnemonic(givenMnemonic, 0, { testnet: true })
        expect(privateKey0).toBe(testData.TESTNET.PRIVATE_KEY_0)

        const privateKey100 = await sdk.generatePrivateKeyFromMnemonic(givenMnemonic, 100, {
          testnet: true,
        })
        expect(privateKey100).toBe(testData.TESTNET.PRIVATE_KEY_100)
      })

      it('invalid child index', async () => {
        await expect(async () =>
          sdk.generatePrivateKeyFromMnemonic(givenMnemonic, -1, { testnet: true }),
        ).rejects.toThrow(testData.INVALID_PRIVATE_KEY_CHILD_INDEX_ERROR)
      })
    })
  },
  generateAddressFromPrivateKey: (
    sdk: SdkWithWalletFunctions,
    testData: BlockchainTestData,
    options?: { skipInvalid?: boolean },
  ) => {
    describe('mainnet', () => {
      it('valid', async () => {
        const address0 = sdk.generateAddressFromPrivateKey(testData.MAINNET.PRIVATE_KEY_0)
        expect(address0).toBe(testData.MAINNET.ADDRESS_0)

        const address100 = sdk.generateAddressFromPrivateKey(testData.MAINNET.PRIVATE_KEY_100)
        expect(address100).toBe(testData.MAINNET.ADDRESS_100)
      })

      if (!options?.skipInvalid) {
        it('invalid private key', () => {
          expect(() => {
            sdk.generateAddressFromPrivateKey('invalidKey')
          }).toThrow(testData.INVALID_PRIVATE_KEY_ERROR)
        })
      }
    })

    describe('testnet', () => {
      it('testnet', async () => {
        const address0 = sdk.generateAddressFromPrivateKey(testData.TESTNET.PRIVATE_KEY_0, { testnet: true })
        expect(address0).toBe(testData.TESTNET.ADDRESS_0)

        const address100 = sdk.generateAddressFromPrivateKey(testData.TESTNET.PRIVATE_KEY_100, {
          testnet: true,
        })
        expect(address100).toBe(testData.TESTNET.ADDRESS_100)
      })

      if (!options?.skipInvalid) {
        it('invalid private key', () => {
          expect(() => {
            sdk.generateAddressFromPrivateKey('invalidKey', { testnet: true })
          }).toThrow(testData.INVALID_PRIVATE_KEY_ERROR)
        })
      }
    })
  },
}
