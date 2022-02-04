import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumKcsSDK } from '@tatumio/kcs'

const kcsSDK = TatumKcsSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function kcsKmsExample() {
  const pendingSignatureIds = await kcsSDK.kms.getAllPending()
  const tx = await kcsSDK.kms.get(pendingSignatureIds.id)

  await kcsSDK.kms.complete(pendingSignatureIds.id, pendingSignatureIds.txId!)
  await kcsSDK.kms.delete(pendingSignatureIds.id)
}
