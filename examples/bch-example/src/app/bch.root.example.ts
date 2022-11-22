import { Fiat } from '@tatumio/api-client'
import { TatumBchSDK } from '@tatumio/bch'

export async function exchangeRateExample() {
  const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Get the current exchange rate.
  // https://apidoc.tatum.io/tag/Exchange-rate#operation/getExchangeRate
  const rate = await bchSDK.getExchangeRate()
  console.log('Rate: ', rate)

  // Get the current exchange rate for BCH/EUR.
  // https://apidoc.tatum.io/tag/Exchange-rate#operation/getExchangeRate
  const rateWithBasePair = await bchSDK.getExchangeRate(Fiat.EUR)
  console.log('Rate for EUR: ', rateWithBasePair)
}
