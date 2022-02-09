import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumOneSDK } from '@tatumio/one'

const oneSDK = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function oneKmsExample() {
  const pendingSignatureIds = await oneSDK.kms.getAllPending()
  const tx = await oneSDK.kms.get(pendingSignatureIds.id)

  await oneSDK.kms.complete(pendingSignatureIds.id, pendingSignatureIds.txId!)
  await oneSDK.kms.delete(pendingSignatureIds.id)
}
