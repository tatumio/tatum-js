import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumTronSDK } from '@tatumio/tron'

const tronSDK = TatumTronSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function tronKmsExample() {
  const pendingSignatureIds = await tronSDK.kms.getAllPending()
  const tx = await tronSDK.kms.get(pendingSignatureIds[0].id)

  // TODO: fix this
  // const signedRawTx = await tronSDK.kms.sign(tx, '0x9483c22a4b68745d41500ba87d2a66f7b220790a373116716a83d987cb10b4a6')
  // await tronSDK.kms.complete(tx.id, signedRawTx!)
  await tronSDK.kms.delete(tx.id)
}
