import { TatumTerraSDK } from '@tatumio/terra'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const terraSDK = TatumTerraSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function terraWalletExample() {
  const wallet = await terraSDK.wallet.wallet()
}
