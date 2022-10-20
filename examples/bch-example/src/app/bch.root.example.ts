import { Fiat } from '@tatumio/api-client'
import { TatumBchSDK } from '@tatumio/bch'

export async function exchangeRateExample() {
  const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Get currenct exchange rate
  const rate = await bchSDK.getExchangeRate()
  console.log(rate)

  // Get currenct exchange rate of the supported FIAT / crypto asset
  const rateWithBasePair = await bchSDK.getExchangeRate(Fiat.EUR)
  console.log(rateWithBasePair)
}
