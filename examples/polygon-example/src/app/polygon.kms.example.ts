import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumPolygonSDK } from '@tatumio/polygon'

const polygonSDK = TatumPolygonSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function polygonKmsExample() {
  const pendingSignatureIds = await polygonSDK.kms.getAllPending()
  const tx = await polygonSDK.kms.get(pendingSignatureIds[0].id)

  const signedRawTx = await polygonSDK.kms.sign(
    tx,
    '0x9483c22a4b68745d41500ba87d2a66f7b220790a373116716a83d987cb10b4a6',
  )
  await polygonSDK.kms.complete(tx.id, signedRawTx!)
  await polygonSDK.kms.delete(tx.id)
}
