import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumCeloSDK } from '@tatumio/celo'

const celoSDK = TatumCeloSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function celoKmsExample() {
  const pendingSignatureIds = await celoSDK.kms.getAllPending()
  const tx = await celoSDK.kms.get(pendingSignatureIds.id)

  await celoSDK.kms.complete(pendingSignatureIds.id, pendingSignatureIds.txId!)
  await celoSDK.kms.delete(pendingSignatureIds.id)
}
