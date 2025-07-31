import { REPLACE_ME_WITH_TATUM_TESTNET_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumCardanoSDK } from '../cardano.sdk'

describe.skip('Cardano - Wallet', () => {
  const sdk = TatumCardanoSDK({ apiKey: REPLACE_ME_WITH_TATUM_TESTNET_API_KEY })

  describe('Generate wallet', () => {
    it('valid', async () => {
      const { mnemonic, xpub } = await sdk.wallet.generateWallet(TEST_DATA.MNEMONIC)
      expect(mnemonic).toBe(TEST_DATA.MNEMONIC)
      expect(xpub).toBe('a6058635d8b12cbcfa4019dbb50c03807179dd62dfed792e74f380947061203b9fb72a5546ed22efc0798b4cc6fb33867fd209e350d101941807f3e7b5c1fe42')
    })

    it('without input mnemonic', async () => {
      const { mnemonic, xpub } = await sdk.wallet.generateWallet()
      expect(mnemonic.length).toBeGreaterThan(0)
      expect(xpub).toHaveLength(128)
    })
  })
  describe('Generate address from xpub', () => {
    it('valid', async () => {
      const address = await sdk.wallet.generateAddressFromXPub('a6058635d8b12cbcfa4019dbb50c03807179dd62dfed792e74f380947061203b9fb72a5546ed22efc0798b4cc6fb33867fd209e350d101941807f3e7b5c1fe42', 0, { testnet: true })
      expect(address).toHaveLength(63)
      expect(address).toBe('addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5')
    })
  })

  describe('Generate PK from mnemonic', () => {
    it('valid', async () => {
      const pk = await sdk.wallet.generatePrivateKeyFromMnemonic(TEST_DATA.MNEMONIC, 0)
      expect(pk).toBe('8873d5e84af86978f03b63d9ffc9c6f940bd8501d32e91980c904e8d81c305507dc95992faa5aefccb263b28b411eda2dde7882d922742663804a69d78182e34')
    })
  })

  describe('Generate address from PK', () => {
    it('valid', async () => {
      const wallet = await sdk.wallet.generateWallet(TEST_DATA.MNEMONIC)
      const address = await sdk.wallet.generateAddressFromXPub(wallet.xpub, 0, { testnet: true })
      const pk = await sdk.wallet.generatePrivateKeyFromMnemonic(TEST_DATA.MNEMONIC, 0)
      expect(pk).toBe('8873d5e84af86978f03b63d9ffc9c6f940bd8501d32e91980c904e8d81c305507dc95992faa5aefccb263b28b411eda2dde7882d922742663804a69d78182e34')
      const add = await sdk.wallet.generateAddressFromPrivateKey(pk, { testnet: true })
      expect(add).toBe(address)
    })
  })

})
