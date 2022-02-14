import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumKcsSDK } from '@tatumio/kcs'

const kcsSDK = TatumKcsSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function kcsKmsExample() {
  const pendingSignatureIds = await kcsSDK.kms.getAllPending()
  const tx = await kcsSDK.kms.get(pendingSignatureIds[0].id)

  const signedRawTx = await kcsSDK.kms.sign(tx, '0x9483c22a4b68745d41500ba87d2a66f7b220790a373116716a83d987cb10b4a6')
  await kcsSDK.kms.complete(tx.id, signedRawTx!)
  await kcsSDK.kms.delete(tx.id)
}
