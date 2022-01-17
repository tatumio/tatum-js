import 'jest/index'
import { BlockchainTestData, TEST_DATA } from '../shared-testing'
import { SdkWithWalletFunctions } from '@tatumio/shared-blockchain-abstract'

export const walletTestFactory = {
  generateBlockchainWallet: (
    sdk: SdkWithWalletFunctions,
    testData: BlockchainTestData,
    givenMnemonic = TEST_DATA.MNEMONIC,
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
      // @TODO add negative cases
    })

    describe('testnet', () => {
      it.each([
        [0, testData.TESTNET.ADDRESS_0],
        [100, testData.TESTNET.ADDRESS_100],
      ])('index %s', async (idx: number, expectedAddress: string) => {
        const address = sdk.generateAddressFromXPub(testData.TESTNET.XPUB, idx, { testnet: true })
        expect(address).toBe(expectedAddress)
      })
      // @TODO add negative cases
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
    })

    // @TODO add negative cases
  },
  generateAddressFromPrivateKey: (sdk: SdkWithWalletFunctions, testData: BlockchainTestData) => {
    describe('mainnet', () => {
      it('valid', async () => {
        const address0 = sdk.generateAddressFromPrivateKey(testData.MAINNET.PRIVATE_KEY_0)
        expect(address0).toBe(testData.MAINNET.ADDRESS_0)

        const address100 = sdk.generateAddressFromPrivateKey(testData.MAINNET.PRIVATE_KEY_100)
        expect(address100).toBe(testData.MAINNET.ADDRESS_100)
      })

      // @TODO add negative cases
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

      // @TODO add negative cases
    })
  },
}
