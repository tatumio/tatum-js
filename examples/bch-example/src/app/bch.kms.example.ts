import { TatumBchSDK } from '@tatumio/bch'

export async function bchKmsExample() {
  const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Get all pending transactions to be signed
  const pendingSignatureIds = await bchSDK.kms.getAllPending()
  console.log([pendingSignatureIds])

  // Get all information about a pending transaction to be signed
  const tx = await bchSDK.kms.get(pendingSignatureIds[0].id)
  console.log(tx)

  // Sign a specific pending transction with a given privateKey
  const signedRawTx = await bchSDK.kms.sign(tx, ['L3Jf3gvX1YaCJJTejTfghZ4Sst8GSui6UQctERksAimYCskVH7iG'])
  console.log(signedRawTx)

  // Complete pending transaction to sign
  await bchSDK.kms.complete(tx.id, signedRawTx!)

  // Delete a pending transaction to be signed
  await bchSDK.kms.delete(tx.id)
}
