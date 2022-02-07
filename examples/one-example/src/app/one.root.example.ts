import { Fiat } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumOneSDK } from '@tatumio/one'

const oneSDK = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function oneChangeRateExample() {
  const rate = await oneSDK.getExchangeRate()
  const rateWithBasePair = await oneSDK.getExchangeRate(Fiat.EUR)
}
