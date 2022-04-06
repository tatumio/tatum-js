import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumEgldSDK } from '../egld.sdk'

describe('EgldSDK - tx', () => {
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
  })
})
