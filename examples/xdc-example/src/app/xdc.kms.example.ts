import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function xdcKmsExample() {
  const pendingSignatureIds = await xdcSDK.kms.getAllPending()
  const tx = await xdcSDK.kms.get(pendingSignatureIds[0].id)

  const signedRawTx = await xdcSDK.kms.sign(
    tx,
    '0x9483c22a4b68745d41500ba87d2a66f7b220790a373116716a83d987cb10b4a6',
  )
  await xdcSDK.kms.complete(tx.id, signedRawTx!)
  await xdcSDK.kms.delete(tx.id)
}
