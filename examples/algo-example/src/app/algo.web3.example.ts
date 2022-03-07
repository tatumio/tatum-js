import { TatumAlgoSDK } from '@tatumio/algo'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const algoSDK = TatumAlgoSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function algoWeb3Example() {
  const algoWebClient = await algoSDK.algoWeb.getClient(true)

  const algoWebIndexerClient = await algoSDK.algoWeb.getIndexerClient(
    true,
    'https://bank.testnet.algorand.network',
  )
}
