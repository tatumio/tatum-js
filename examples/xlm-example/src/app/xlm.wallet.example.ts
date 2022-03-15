import { TatumXlmSDK } from '@tatumio/xlm'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const xlmSDK = TatumXlmSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function xlmWalletExample() {
  const wallet = xlmSDK.wallet.wallet()
}
