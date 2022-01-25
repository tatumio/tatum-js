import { TatumXrpSDK } from './xrp.sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA, xrpLikeWalletTestFactory } from '@tatumio/shared-testing'

describe('TatumXrpSDK', () => {
  const sdk = TatumXrpSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  describe('Generate wallet', () => {
    xrpLikeWalletTestFactory.generateWallet(sdk.blockchain, TEST_DATA.XRP)
  })
})
