import { Fiat } from '@tatumio/api-client'
import { TatumBtcSDK } from '@tatumio/btc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const btcSDK = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function exchangeRateExample() {
  const rate = await btcSDK.getExchangeRate()
  const rateWithBasePair = await btcSDK.getExchangeRate(Fiat.EUR)
}
