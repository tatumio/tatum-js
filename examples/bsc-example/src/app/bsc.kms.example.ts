import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumBscSDK } from '@tatumio/bsc'

const bscSDK = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bscKmsExample() {
  const pendingSignatureIds = await bscSDK.kms.getAllPending()
  const tx = await bscSDK.kms.get(pendingSignatureIds[0].id)

  const signedRawTx = await bscSDK.kms.sign(tx, '0x9483c22a4b68745d41500ba87d2a66f7b220790a373116716a83d987cb10b4a6')
  await bscSDK.kms.complete(tx.id, signedRawTx!)
  await bscSDK.kms.delete(tx.id)
}
