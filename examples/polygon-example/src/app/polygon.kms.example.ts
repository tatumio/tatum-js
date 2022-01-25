import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumPolygonSDK } from '@tatumio/polygon'

const polygonSDK = TatumPolygonSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function polygonKmsExample() {
  const pendingSignatureIds = await polygonSDK.kms.getAllPending()
  const tx = await polygonSDK.kms.get(pendingSignatureIds.id)

  await polygonSDK.kms.complete(pendingSignatureIds.id, pendingSignatureIds.txId!)
  await polygonSDK.kms.delete(pendingSignatureIds.id)
}
