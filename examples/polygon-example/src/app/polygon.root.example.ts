import { Fiat } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumPolygonSDK } from '@tatumio/polygon'

const polygonSDK = TatumPolygonSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function polygonChangeRateExample() {
  const rate = await polygonSDK.getExchangeRate()
  const rateWithBasePair = await polygonSDK.getExchangeRate(Fiat.EUR)
}
