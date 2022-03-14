import { Fiat } from '@tatumio/api-client'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumTerraSDK } from '@tatumio/terra'

const terraSDK = TatumTerraSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function terraChangeRateExample() {
  const rate = await terraSDK.getExchangeRate()
  const rateWithBasePair = await terraSDK.getExchangeRate(Fiat.EUR)
}
