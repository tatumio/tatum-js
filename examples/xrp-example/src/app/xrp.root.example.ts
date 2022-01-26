import { Fiat } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumXrpSDK } from '@tatumio/xrp'

const xrpSDK = TatumXrpSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function xrpChangeRateExample() {
  const rate = await xrpSDK.getExchangeRate()
  const rateWithBasePair = await xrpSDK.getExchangeRate(Fiat.EUR)
}
