import { Fiat } from '@tatumio/api-client'
import { TatumAdaSDK } from '@tatumio/ada'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const adaSDK = TatumAdaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function exchangeRateExample() {
  const rate = await adaSDK.getExchangeRate()
  const rateWithBasePair = await adaSDK.getExchangeRate(Fiat.EUR)
}
