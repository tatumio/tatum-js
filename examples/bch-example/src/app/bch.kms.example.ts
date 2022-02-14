import { TatumBchSDK } from '@tatumio/bch'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const bchSDK = TatumBchSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bchKmsExample() {
  const pendingSignatureIds = await bchSDK.kms.getAllPending()
  const tx = await bchSDK.kms.get(pendingSignatureIds[0].id)
  const signedRawTx = await bchSDK.kms.sign(tx, [
    'L3Jf3gvX1YaCJJTejTfghZ4Sst8GSui6UQctERksAimYCskVH7iG',
  ])
  await bchSDK.kms.complete(tx.id, signedRawTx!)
  await bchSDK.kms.delete(tx.id)
}
