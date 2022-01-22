import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumOneSDK } from '@tatumio/one'

const oneSDK = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function oneBlockchainExample() {
  const block = await oneSDK.blockchain.getBlock(
    '0x305c58c8c62399097f1ea702e337f13be6b3a3ed28867d530d8a03191f040b9c',
  )
}
