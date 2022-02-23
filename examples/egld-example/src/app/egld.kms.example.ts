import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumEgldSDK } from '@tatumio/egld'

const egldSDK = TatumEgldSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function egldKmsExample() {
  const pendingSignatureIds = await egldSDK.kms.getAllPending()
  const tx = await egldSDK.kms.get(pendingSignatureIds.id)
  const signedRawTx = await egldSDK.kms.sign(
    pendingSignatureIds,
    '0cd8e6217b4a218807b858ffb508483cdcdadbb7a21196727f764a510a692760',
  )
  await egldSDK.kms.complete(pendingSignatureIds.id, pendingSignatureIds.txId!)
  await egldSDK.kms.delete(pendingSignatureIds.id)
}
