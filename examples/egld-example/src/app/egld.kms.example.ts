import { TatumEgldSDK } from '@tatumio/egld'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const egldSDK = TatumEgldSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function egldKmsExample() {
  const pendingSignatureIds = await egldSDK.kms.getAllPending()
  const tx = await egldSDK.kms.get(pendingSignatureIds[0].id)

  const signedRawTx = await egldSDK.kms.sign(
    tx,
    '9483c22a4b68745d41500ba87d2a66f7b220790a373116716a83d987cb10b4a6',
  )
  await egldSDK.kms.complete(tx.id, signedRawTx!)
  await egldSDK.kms.delete(tx.id)
}
