import { Fiat } from '@tatumio/api-client'
import { TatumLtcSDK } from '@tatumio/ltc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const ltcSDK = TatumLtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function exchangeRateExample() {
  const rate = await ltcSDK.getExchangeRate()
  const rateWithBasePair = await ltcSDK.getExchangeRate(Fiat.EUR)
}
