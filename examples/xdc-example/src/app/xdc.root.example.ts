import { Fiat } from '@tatumio/api-client'
import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function xdcChangeRateExample() {
  const rate = await xdcSDK.getExchangeRate()
  const rateWithBasePair = await xdcSDK.getExchangeRate(Fiat.EUR)
}
