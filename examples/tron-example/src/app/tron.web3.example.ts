import { TatumTronSDK } from '@tatumio/tron'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const tronSDK = TatumTronSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function tronWeb3Example() {
  const tronWebClient = await tronSDK.tronWeb.getClient()
}
