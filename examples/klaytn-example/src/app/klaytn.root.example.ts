import { Fiat } from '@tatumio/api-client'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumKlaytnSDK } from '@tatumio/klaytn'

const klaytnSDK = TatumKlaytnSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function klaytnChangeRateExample() {
  const rate = await klaytnSDK.getExchangeRate()
  const rateWithBasePair = await klaytnSDK.getExchangeRate(Fiat.EUR)
}
