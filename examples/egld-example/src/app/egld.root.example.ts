import { Fiat } from '@tatumio/api-client'
import { TatumEgldSDK } from '@tatumio/egld'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const egldSDK = TatumEgldSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function egldChangeRateExample() {
  const rate = await egldSDK.getExchangeRate()
  const rateWithBasePair = await egldSDK.getExchangeRate(Fiat.EUR)
}
