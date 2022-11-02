import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function xdcKmsExample() {
  // Get All pending KMS
  // https://apidoc.tatum.io/tag/Key-Management-System#operation/GetPendingTransactionsToSign
  const pendingSignatureIds = await xdcSDK.kms.getAllPending()
  console.log(`Pending kms transaction ${JSON.stringify(pendingSignatureIds)}`)

  //Get transaction by signature id
  // https://apidoc.tatum.io/tag/Key-Management-System#operation/GetPendingTransactionsToSign
  if (pendingSignatureIds.length > 0) {
    const tx = await xdcSDK.kms.get(pendingSignatureIds[0].id)
    // Sign
    const signedRawTx = await xdcSDK.kms.sign(
      tx,
      '0x9483c22a4b68745d41500ba87d2a66f7b220790a373116716a83d987cb10b4a6',
    )

    // Complete pending transaction to sign
    // https://apidoc.tatum.io/tag/Key-Management-System#operation/CompletePendingSignature
    await xdcSDK.kms.complete(tx.id, signedRawTx!)

    // Delete KMS transaction
    // https://apidoc.tatum.io/tag/Key-Management-System#operation/DeletePendingTransactionToSign
    await xdcSDK.kms.delete(tx.id)
  }
}
