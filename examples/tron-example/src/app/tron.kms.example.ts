import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumTronSDK } from '@tatumio/tron'

const tronSDK = TatumTronSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function tronKmsExample() {
  const pendingSignatureIds = await tronSDK.kms.getAllPending()
  const tx = await tronSDK.kms.get(pendingSignatureIds.id)

  await tronSDK.kms.complete(pendingSignatureIds.id, pendingSignatureIds.txId!)
  await tronSDK.kms.delete(pendingSignatureIds.id)
}
