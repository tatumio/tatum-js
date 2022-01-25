import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumEthSDK } from '@tatumio/eth'

const ethSDK = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ethBlockchainExample() {
  const block = await ethSDK.blockchain.getBlock(
    '0x527d2f059244f7cbe1ec84aa75e7d1637463a793d82cf7015b3c2a7a5a3ec053',
  )
}
