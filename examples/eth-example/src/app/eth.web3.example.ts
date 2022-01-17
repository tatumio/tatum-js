import { TatumEthSDK } from '@tatumio/eth'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const ethSDK = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ethDriverExample() {
  const web3response = await ethSDK.httpDriver({
    jsonrpc: '2.0',
    method: 'web3_clientVersion',
    params: [],
    id: 2,
  })
}

export async function ethWeb3Example() {
  const gasPriceInWei = await ethSDK.getGasPriceInWei()
  const web3 = await ethSDK.web3Client()
}
