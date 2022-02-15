import { Fiat } from '@tatumio/api-client'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumAlgoSDK } from '@tatumio/algo'

const algoSDK = TatumAlgoSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function exchangeRateExample() {
  const rate = await algoSDK.getExchangeRate()
  const rateWithBasePair = await algoSDK.getExchangeRate(Fiat.EUR)
}
