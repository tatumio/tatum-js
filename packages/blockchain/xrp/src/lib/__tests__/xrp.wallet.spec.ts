import { TatumXrpSDK } from '../xrp.sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { xrpLikeWalletTestFactory } from '@tatumio/shared-testing-xrp-based'

describe('XrpSDK - wallet', () => {
  const sdk = TatumXrpSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  describe('Generate wallet', () => {
    xrpLikeWalletTestFactory.generateWallet(sdk, TEST_DATA.XRP)
  })
})
