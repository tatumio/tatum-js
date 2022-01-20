import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumDogeSDK } from '@tatumio/doge'

const dogeSDK = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function dogeApiExample() {
  const mempoolTransactionIds = await dogeSDK.api.dogeGetMempool()
  const block = await dogeSDK.api.dogeGetBlock(
    '2b5ff9b07eb150b12d0724b7fd4e4a1c0be61f674f8ba82798456d2c3c045717',
  )
}
