import { Fiat } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumEgldSDK } from '@tatumio/egld'

const egldSDK = TatumEgldSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function exchangeRateExample() {
  const rate = await egldSDK.getExchangeRate()
  const rateWithBasePair = await egldSDK.getExchangeRate(Fiat.EUR)
}
