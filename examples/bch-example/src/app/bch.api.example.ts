import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumBchSDK } from '@tatumio/bch'

const bchSDK = TatumBchSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bchApiExample() {
  const blockChainInfo = await bchSDK.api.bchGetBlockChainInfo()
  const block = await bchSDK.api.bchGetBlock(
    '0000000000000010da4dbada5440ec86dd74d0ade1920ac1897f9adcfe83f8b9',
  )
}
