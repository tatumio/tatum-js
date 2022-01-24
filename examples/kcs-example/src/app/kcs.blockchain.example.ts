import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumKcsSDK } from '@tatumio/kcs'

const kcsSDK = TatumKcsSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function kcsBlockchainExample() {
  const block = await kcsSDK.blockchain.getBlock(
    '0x4e0f0ac033ef1fa2cb4b9e045979384695afdb18c313a2284426a64d89316c3e',
  )
}
