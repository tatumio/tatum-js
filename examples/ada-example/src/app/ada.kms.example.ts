import { TatumAdaSDK } from '@tatumio/ada'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const adaSDK = TatumAdaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function adaKmsExample() {
  const pendingSignatureIds = await adaSDK.kms.getAllPending()
  const tx = await adaSDK.kms.get(pendingSignatureIds.id)
  const signedRawTx = await adaSDK.kms.sign(pendingSignatureIds, [
    'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
  ])
  await adaSDK.kms.complete(pendingSignatureIds.id, pendingSignatureIds.txId!)
  await adaSDK.kms.delete(pendingSignatureIds.id)
}
