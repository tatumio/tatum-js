import { TatumKcsSDK } from '@tatumio/kcs'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const kcsSDK = TatumKcsSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function kcsDriverExample() {
  const web3response = await kcsSDK.httpDriver({
    jsonrpc: '2.0',
    method: 'web3_clientVersion',
    params: [],
    id: 2,
  })
}

export async function kcsWeb3Example() {
  const gasPriceInWei = await kcsSDK.getGasPriceInWei()
  const web3 = kcsSDK.web3Client()
}
