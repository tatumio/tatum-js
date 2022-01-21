import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumLtcSDK } from '@tatumio/ltc'

const ltcSDK = TatumLtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ltcApiExample() {
  const mempoolTransactionIds = await ltcSDK.api.ltcGetMempool()
  const block = await ltcSDK.api.ltcGetBlock(
    '444a4fdf21b3f12370982a4f00c3e311e9d2844d1b2306f00d5514829821e494',
  )
}
