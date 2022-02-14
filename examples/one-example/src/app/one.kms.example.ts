import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumOneSDK } from '@tatumio/one'

const oneSDK = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function oneKmsExample() {
  const pendingSignatureIds = await oneSDK.kms.getAllPending()
  const tx = await oneSDK.kms.get(pendingSignatureIds[0].id)

  const signedRawTx = await oneSDK.kms.sign(tx, '0x9483c22a4b68745d41500ba87d2a66f7b220790a373116716a83d987cb10b4a6')
  await oneSDK.kms.complete(tx.id, signedRawTx!)
  await oneSDK.kms.delete(tx.id)
}
