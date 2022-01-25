import { TatumOneSDK } from '@tatumio/one'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const oneSDK = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function oneDriverExample() {
  const web3response = await oneSDK.httpDriver({
    jsonrpc: '2.0',
    method: 'web3_clientVersion',
    params: [],
    id: 2,
  })
}

export async function oneWeb3Example() {
  const gasPriceInWei = await oneSDK.getGasPriceInWei()
  const web3 = oneSDK.web3Client()
}
