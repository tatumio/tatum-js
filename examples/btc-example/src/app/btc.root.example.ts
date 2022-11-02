import { Fiat } from '@tatumio/api-client'
import { TatumBtcSDK } from '@tatumio/btc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

export async function exchangeRateExample() {
  const btcSDK = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  // Get currenct exchange rate
  // You can find more details in https://apidoc.tatum.io/tag/Exchange-rate#operation/getExchangeRate
  const rate = await btcSDK.getExchangeRate()
  console.log(rate)

  // Get currenct exchange rate of the supported FIAT / crypto asset
  // You can find more details in https://apidoc.tatum.io/tag/Exchange-rate#operation/getExchangeRate
  const rateWithBasePair = await btcSDK.getExchangeRate(Fiat.EUR)
  console.log(rateWithBasePair)
}
