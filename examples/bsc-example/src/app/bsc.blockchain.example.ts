import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumBscSDK } from '@tatumio/bsc'

const bscSDK = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bscBlockchainExample() {
  const block = await bscSDK.blockchain.getBlock(
    '0x305c58c8c62399097f1ea702e337f13be6b3a3ed28867d530d8a03191f040b9c',
  )
}
