import { TatumLtcSDK } from '@tatumio/ltc'

export async function ltcKmsExample() {
  const ltcSDK = TatumLtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Get all pending transactions to be signed
  // You can find more details in https://apidoc.tatum.io/tag/Key-Management-System#operation/GetPendingTransactionsToSign 
  const pendingSignatureIds = await ltcSDK.kms.getAllPending()

  if (pendingSignatureIds.length) {
    // Get all information about a pending transaction to be signed
    // You can find more details in https://apidoc.tatum.io/tag/Key-Management-System#operation/GetPendingTransactionToSign
    const tx = await ltcSDK.kms.get(pendingSignatureIds[0].id)

    // Sign a specific pending transaction with a given privateKey
    const signedRawTx = await ltcSDK.kms.sign(tx, ['T63MUovVt5GN5rmfwYMr4M6YqFmisjbrZrfZYZ53qWmCwiP6xCHa'])

    // Complete pending transaction to sign
    // You can find more details in https://apidoc.tatum.io/tag/Key-Management-System#operation/CompletePendingSignature
    await ltcSDK.kms.complete(tx.id, signedRawTx!)

    // Delete a pending transaction to be signed
    // You can find more details in https://apidoc.tatum.io/tag/Key-Management-System#operation/DeletePendingTransactionToSign
    await ltcSDK.kms.delete(tx.id)
  }
}
