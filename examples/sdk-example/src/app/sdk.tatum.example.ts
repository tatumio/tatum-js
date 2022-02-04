import { TatumSDK } from '@tatumio/sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const tatumSDK = TatumSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function tatumApiExample() {
  const version = await tatumSDK.tatum.getVersion()
  const consumptionsByDay = await tatumSDK.tatum.getCredits()

  await tatumSDK.tatum.freezeApiKey()
  await tatumSDK.tatum.unfreezeApiKey()
}
