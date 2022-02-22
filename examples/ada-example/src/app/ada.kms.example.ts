import { TatumAdaSDK } from '@tatumio/ada'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const adaSDK = TatumAdaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function adaKmsExample() {
  const pendingSignatureIds = await adaSDK.kms.getAllPending()
  const tx = await adaSDK.kms.get(pendingSignatureIds[0].id)
  const signedRawTx = await adaSDK.kms.sign(tx, ['cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf'])
  await adaSDK.kms.complete(tx.id, tx.txId!)
  await adaSDK.kms.delete(tx.id)
}
