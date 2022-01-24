import { Fiat } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumKcsSDK } from '@tatumio/kcs'

const kcsSDK = TatumKcsSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function kcsChangeRateExample() {
  const rate = await kcsSDK.getExchangeRate()
  const rateWithBasePair = await kcsSDK.getExchangeRate(Fiat.EUR)
}
