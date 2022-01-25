import { TatumBscSDK } from '@tatumio/bsc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const bscSDK = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bscDriverExample() {
  const web3response = await bscSDK.httpDriver({
    jsonrpc: '2.0',
    method: 'web3_clientVersion',
    params: [],
    id: 2,
  })
}

export async function bscWeb3Example() {
  const gasPriceInWei = await bscSDK.getGasPriceInWei()
  const web3 = bscSDK.web3Client()
}
