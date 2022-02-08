import { Fiat } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumXlmSDK } from '@tatumio/xlm'

const xlmSDK = TatumXlmSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function xlmChangeRateExample() {
  const rate = await xlmSDK.getExchangeRate()
  const rateWithBasePair = await xlmSDK.getExchangeRate(Fiat.EUR)
}
