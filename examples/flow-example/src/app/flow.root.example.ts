import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumFlowSDK } from '@tatumio/flow'
import { Fiat } from '@tatumio/api-client'

const flowSDK = TatumFlowSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function flowChangeRateExample() {
  const rate = await flowSDK.getExchangeRate()
  const rateWithBasePair = await flowSDK.getExchangeRate(Fiat.EUR)
}
