import { TatumXlmSDK } from './xlm.sdk'
import {
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  xrpLikeWalletTestFactory,
} from '@tatumio/shared-testing-common'

describe('TatumXlmSDK', () => {
  const sdk = TatumXlmSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  describe('Generate wallet', () => {
    xrpLikeWalletTestFactory.generateWallet(sdk, TEST_DATA.XLM)
  })
})
