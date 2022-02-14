import { TatumLtcSDK } from '@tatumio/ltc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const ltcSDK = TatumLtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ltcKmsExample() {
  const pendingSignatureIds = await ltcSDK.kms.getAllPending()
  const tx = await ltcSDK.kms.get(pendingSignatureIds[0].id)
  const signedRawTx = await ltcSDK.kms.sign(tx, [
    'T63MUovVt5GN5rmfwYMr4M6YqFmisjbrZrfZYZ53qWmCwiP6xCHa',
  ])
  await ltcSDK.kms.complete(tx.id, signedRawTx!)
  await ltcSDK.kms.delete(tx.id)
}
