import {TatumXrpSDK} from './xrp.sdk'
import {REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA} from "@tatumio/shared-testing";

describe('TatumXrpSDK', () => {
  const sdk = TatumXrpSDK({apiKey: REPLACE_ME_WITH_TATUM_API_KEY})

  describe('Wallet', () => {
    it('Generate wallet', async () => {
      try {
        const {address, secret} = await sdk.blockchain.wallet()
        expect(address).toMatch(TEST_DATA.XRP.ADDRESS_REGEX)
        expect(secret).toMatch(TEST_DATA.XRP.SECRET_REGEX)
      } catch (e) {
        console.log("Generate XRP wallet failed: ", e)
        expect(e).not.toBeDefined()
      }
    })
  })
})
