import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumBscSDK } from '@tatumio/bsc'

const bscSDK = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bscKmsExample() {
  const pendingSignatureIds = await bscSDK.kms.getAllPending()
  const tx = await bscSDK.kms.get(pendingSignatureIds.id)

  await bscSDK.kms.complete(pendingSignatureIds.id, pendingSignatureIds.txId!)
  await bscSDK.kms.delete(pendingSignatureIds.id)
}
