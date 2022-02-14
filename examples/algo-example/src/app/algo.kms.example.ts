import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumAlgoSDK } from '@tatumio/algo'

const algoSDK = TatumAlgoSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function algoKmsExample() {
  const pendingSignatureIds = await algoSDK.kms.getAllPending()
  const tx = await algoSDK.kms.get(pendingSignatureIds.id)

  await algoSDK.kms.complete(pendingSignatureIds.id, pendingSignatureIds.txId!)
  await algoSDK.kms.delete(pendingSignatureIds.id)
}
