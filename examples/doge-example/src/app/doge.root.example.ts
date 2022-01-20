import { Currency, Fiat } from '@tatumio/shared-core'
import { TatumDogeSDK } from '@tatumio/doge'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const dogeSDK = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function exchangeRateExample() {
  const rate = await dogeSDK.getExchangeRate()
  const rateWithBasePair = await dogeSDK.getExchangeRate(Fiat.EUR)
}
