import { TatumKlaytnSDK } from '@tatumio/klaytn'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const klaytnSDK = TatumKlaytnSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function klaytnDriverExample() {
  const web3response = await klaytnSDK.httpDriver({
    jsonrpc: '2.0',
    method: 'web3_clientVersion',
    params: [],
    id: 2,
  })
}

export async function klaytnWeb3Example() {
  const gasPriceInWei = await klaytnSDK.getGasPriceInWei()
  const web3 = klaytnSDK.web3Client()
}
