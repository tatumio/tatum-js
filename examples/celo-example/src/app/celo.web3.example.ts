import { TatumCeloSDK } from '@tatumio/celo'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const celoSDK = TatumCeloSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function celoDriverExample() {
  const web3response = await celoSDK.httpDriver({
    jsonrpc: '2.0',
    method: 'web3_clientVersion',
    params: [],
    id: 2,
  })
}

export async function celoWeb3Example() {
  const gasPriceInWei = await celoSDK.getGasPriceInWei()
  const web3 = celoSDK.web3Client()
}
