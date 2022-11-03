import { TatumOneSDK } from '@tatumio/one'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const oneSDK = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

// https://apidoc.tatum.io/tag/Key-Management-System
export async function oneKmsExample() {
  // https://apidoc.tatum.io/tag/Key-Management-System#operation/GetPendingTransactionsToSign
  const pendingSignatureIds = await oneSDK.kms.getAllPending()
  console.log('Pending signatures: ', pendingSignatureIds)
  const tx = await oneSDK.kms.get(pendingSignatureIds[0].id)

  // https://apidoc.tatum.io/tag/Key-Management-System#operation/CompletePendingSignature
  const signedRawTx = await oneSDK.kms.sign(
    tx,
    '0x9483c22a4b68745d41500ba87d2a66f7b220790a373116716a83d987cb10b4a6',
  )
  await oneSDK.kms.complete(tx.id, signedRawTx!)

  // https://apidoc.tatum.io/tag/Key-Management-System#operation/DeletePendingTransactionToSign
  await oneSDK.kms.delete(tx.id)
}
