import { Currency, Fiat } from '@tatumio/shared-core'
import { TatumBtcSDK } from '@tatumio/btc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const btcSDK = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function exchangeRateExample() {
  const rate = await btcSDK.getExchangeRate()
  const rateWithBasePair = await btcSDK.getExchangeRate(Fiat.EUR)
}
