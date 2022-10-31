import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumEthSDK } from '@tatumio/eth'

const ethSDK = TatumEthSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function ethKmsExample() {
  // Get All pending KMS
  // https://apidoc.tatum.io/tag/Key-Management-System#operation/GetPendingTransactionsToSign
  const pendingSignatureIds = await ethSDK.kms.getAllPending()
  console.log(`Pending kms transaction ${JSON.stringify(pendingSignatureIds)}`)

  if (pendingSignatureIds.length > 0) {
    //Get transaction by signature id
    // https://apidoc.tatum.io/tag/Key-Management-System#operation/GetPendingTransactionsToSign
    const tx = await ethSDK.kms.get(pendingSignatureIds[0].id)
    console.log(`Raw transaction ${JSON.stringify(tx)}`)

    // Complete pending transaction to sign
    // https://apidoc.tatum.io/tag/Key-Management-System#operation/CompletePendingSignature
    const signedRawTx = await ethSDK.kms.sign(
      tx,
      '0x254ac28e10916b3c2def004a37fec216649288ae71c8cac41faf106193263792',
    )
    console.log(`Raw signed transaction ${JSON.stringify(tx)}`)

    // Complete pending transaction to sign
    // https://apidoc.tatum.io/tag/Key-Management-System#operation/CompletePendingSignature
    await ethSDK.kms.complete(tx.id, signedRawTx!)
    console.log(`Transaction with id ${tx.id} completed successfully`)

    // Delete KMS transaction
    // https://apidoc.tatum.io/tag/Key-Management-System#operation/DeletePendingTransactionToSign
    await ethSDK.kms.delete(tx.id)
    console.log(`Transaction with id ${tx.id} deleted successfully`)
  }
}
