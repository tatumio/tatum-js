import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumEgldSDK } from '../egld.sdk'
import { egldWallet } from '../services/egld.wallet'

// Too unstable
describe.skip('EgldSDK - tx', () => {
  const sdk = TatumEgldSDK({
    apiKey: REPLACE_ME_WITH_TATUM_API_KEY,
  })

  describe('Egld wallet', () => {
    it('should create wallet without mnemonic', async () => {
      const wallet = await sdk.wallet.generateWallet()

      expect(wallet.mnemonic).toBeDefined()
    })

    it('should create wallet with mnemonic', async () => {
      const wallet = await sdk.wallet.generateWallet(TEST_DATA.MNEMONIC)

      expect(wallet.mnemonic).toBe(TEST_DATA.MNEMONIC)
    })

    it('should create private key from mnemonic', async () => {
      const privateKey = await sdk.wallet.generatePrivateKeyFromMnemonic(true, TEST_DATA.MNEMONIC, 3)

      expect(privateKey).toBe('d330eb08a29f724ae668f664aae7e635028231f6c054c7e996510fcbcb997090')
    })

    it('should generate address', async () => {
      const address = await sdk.wallet.generateAddress(true, TEST_DATA.MNEMONIC, 3)

      expect(address).toBe('erd1ej4y5ygndu76vcvfzrv4h3vnrwy30gze0mtv4psv90awp7z08l2sqlc7fl')
    })
  })
})

describe('egldWallet - generateAddressFromXPub', () => {
  const wallet = egldWallet()

  it('should generate same address as generateAddress (testnet)', async () => {
    const addressFromXPub = await wallet.generateAddressFromXPub(TEST_DATA.MNEMONIC, 3, true)
    const addressFromGenerate = await wallet.generateAddress(true, TEST_DATA.MNEMONIC, 3)

    expect(addressFromXPub).toBe(addressFromGenerate)
    expect(addressFromXPub).toBe('erd1ej4y5ygndu76vcvfzrv4h3vnrwy30gze0mtv4psv90awp7z08l2sqlc7fl')
  })

  it('should generate same address as generateAddress (mainnet)', async () => {
    const addressFromXPub = await wallet.generateAddressFromXPub(TEST_DATA.MNEMONIC, 0, false)
    const addressFromGenerate = await wallet.generateAddress(false, TEST_DATA.MNEMONIC, 0)

    expect(addressFromXPub).toBe(addressFromGenerate)
  })

  it('should generate same address for multiple derivation indices', async () => {
    for (const i of [0, 1, 2, 5, 10]) {
      const addressFromXPub = await wallet.generateAddressFromXPub(TEST_DATA.MNEMONIC, i, true)
      const addressFromGenerate = await wallet.generateAddress(true, TEST_DATA.MNEMONIC, i)

      expect(addressFromXPub).toBe(addressFromGenerate)
    }
  })
})
