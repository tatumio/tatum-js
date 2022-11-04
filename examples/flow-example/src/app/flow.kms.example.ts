import { TatumFlowSDK } from '@tatumio/flow'
import { TransactionHash } from '@tatumio/api-client'

const flowSDK = TatumFlowSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab', testnet: true })

export async function flowKmsExample() {
  // Get All pending KMS
  // https://apidoc.tatum.io/tag/Key-Management-System#operation/GetPendingTransactionsToSign
  const pendingSignatureIds = await flowSDK.kms.getAllPending()
  console.log(`Pending kms transaction ${JSON.stringify(pendingSignatureIds)}`)

  const privateKey = 'PUT YOUR PRIVATE KEY HERE'

  // Get transaction by signature id
  // https://apidoc.tatum.io/tag/Key-Management-System#operation/GetPendingTransactionsToSign
  if (pendingSignatureIds.length > 0) {
    const tx = await flowSDK.kms.get(pendingSignatureIds[0].id)
    // Sign
    const { txId } = (await flowSDK.kms.sign(tx, [privateKey])) as TransactionHash

    // Complete pending transaction to sign
    // https://apidoc.tatum.io/tag/Key-Management-System#operation/CompletePendingSignature
    await flowSDK.kms.complete(tx.id, txId)

    // Delete KMS transaction
    // https://apidoc.tatum.io/tag/Key-Management-System#operation/DeletePendingTransactionToSign
    await flowSDK.kms.delete(tx.id)
  }
}
