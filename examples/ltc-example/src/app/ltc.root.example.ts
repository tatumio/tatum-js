import { Fiat } from '@tatumio/api-client'
import { TatumLtcSDK } from '@tatumio/ltc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

export async function exchangeRateExample() {
  const ltcSDK = TatumLtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  // Get currenct exchange rate
  // You can find more details in https://apidoc.tatum.io/tag/Exchange-rate#operation/getExchangeRate
  const rate = await ltcSDK.getExchangeRate()
  console.log(`Rate: ${JSON.stringify(rate)}`)

  // Get currenct exchange rate of the supported FIAT / crypto asset
  // You can find more details in https://apidoc.tatum.io/tag/Exchange-rate#operation/getExchangeRate
  const rateWithBasePair = await ltcSDK.getExchangeRate(Fiat.EUR)
  console.log(`Rate with base pair: ${JSON.stringify(rateWithBasePair)}`)
}
