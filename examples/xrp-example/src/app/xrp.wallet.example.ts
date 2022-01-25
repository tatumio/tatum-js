import { TatumXrpSDK } from '@tatumio/xrp'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const xrpSDK = TatumXrpSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function xrpWalletExample() {
  const wallet = await xrpSDK.wallet()
}
