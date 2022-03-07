import { Fiat } from '@tatumio/api-client'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumCeloSDK } from '@tatumio/celo'

const celoSDK = TatumCeloSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function celoChangeRateExample() {
  const rate = await celoSDK.getExchangeRate()
  const rateWithBasePair = await celoSDK.getExchangeRate(Fiat.EUR)
}
