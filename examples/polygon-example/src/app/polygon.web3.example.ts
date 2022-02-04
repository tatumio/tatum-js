import { TatumPolygonSDK } from '@tatumio/polygon'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const polygonSDK = TatumPolygonSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function polygonDriverExample() {
  const web3response = await polygonSDK.httpDriver({
    jsonrpc: '2.0',
    method: 'web3_clientVersion',
    params: [],
    id: 2,
  })
}

export async function polygonWeb3Example() {
  const gasPriceInWei = await polygonSDK.getGasPriceInWei()
  const web3 = polygonSDK.web3Client()
}
