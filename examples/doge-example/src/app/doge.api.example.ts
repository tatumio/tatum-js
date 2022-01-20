import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumDogeSDK } from '@tatumio/doge'

const dogeSDK = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function dogeApiExample() {
  const mempoolTransactionIds = await dogeSDK.api.dogeGetMempool()
  const block = await dogeSDK.api.dogeGetBlock(
    '0000000000000000000067de34da54c96ff76e6ba172f82c4ed8a25afb112a9e',
  )
}
