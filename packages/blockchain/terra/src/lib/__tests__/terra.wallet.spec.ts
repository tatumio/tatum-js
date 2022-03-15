import { TatumTerraSDK } from '../terra.sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { xrpLikeWalletTestFactory } from '@tatumio/shared-testing-xrp-based'

describe('TerraSDK - wallet', () => {
  const sdk = TatumTerraSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  describe('Generate wallet', () => {
    xrpLikeWalletTestFactory.generateWallet(sdk.wallet, TEST_DATA.TERRA)
  })
})
