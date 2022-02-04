import { Fiat } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumFlowSDK } from '@tatumio/flow'

const flowSDK = TatumFlowSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function flowChangeRateExample() {
  const rate = await flowSDK.getExchangeRate()
  const rateWithBasePair = await flowSDK.getExchangeRate(Fiat.EUR)
}
