import { Fiat } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumBscSDK } from '@tatumio/bsc'

const bscSDK = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bscChangeRateExample() {
  const rate = await bscSDK.getExchangeRate()
  const rateWithBasePair = await bscSDK.getExchangeRate(Fiat.EUR)
}
