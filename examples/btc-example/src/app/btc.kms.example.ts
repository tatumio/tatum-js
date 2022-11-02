import { TatumBtcSDK } from '@tatumio/btc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

export async function btcKmsExample() {
  const btcSDK = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  // Get all pending transactions to be signed
  // You can find more details in https://apidoc.tatum.io/tag/Key-Management-System#operation/GetPendingTransactionsToSign
  const pendingSignatureIds = await btcSDK.kms.getAllPending()
  console.log(pendingSignatureIds)

  // Get all information about a pending transaction to be signed
  // You can find more details in https://apidoc.tatum.io/tag/Key-Management-System#operation/GetPendingTransactionToSign
  const tx = await btcSDK.kms.get(pendingSignatureIds[0].id)
  console.log(pendingSignatureIds)

  // Sign a specific pending transction with a given privateKey
  const signedRawTx = await btcSDK.kms.sign(tx, ['L27j51mbxeWksCcWLUxUT7MhP4iQWDRsb72seDKNo6yERKPr3vtj'])
  console.log(pendingSignatureIds)

  // Complete pending transaction to sign
  // You can find more details in https://apidoc.tatum.io/tag/Key-Management-System#operation/CompletePendingSignature
  await btcSDK.kms.complete(tx.id, signedRawTx)

  // Delete a pending transaction to be signed
  // You can find more details in https://apidoc.tatum.io/tag/Key-Management-System#operation/DeletePendingTransactionToSign
  await btcSDK.kms.delete(tx.id)
}
