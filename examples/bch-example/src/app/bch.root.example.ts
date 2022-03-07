import { Fiat } from '@tatumio/api-client'
import { TatumBchSDK } from '@tatumio/bch'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const bchSDK = TatumBchSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function exchangeRateExample() {
  const rate = await bchSDK.getExchangeRate()
  const rateWithBasePair = await bchSDK.getExchangeRate(Fiat.EUR)
}
