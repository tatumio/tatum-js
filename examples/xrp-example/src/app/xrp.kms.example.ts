import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumXrpSDK } from '@tatumio/xrp'

const xrpSDK = TatumXrpSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function xrpKmsExample() {
  const pendingSignatureIds = await xrpSDK.kms.getAllPending()
  const tx = await xrpSDK.kms.get(pendingSignatureIds[0].id)

  const signedRawTx = await xrpSDK.kms.sign(
    tx,
    '0x9483c22a4b68745d41500ba87d2a66f7b220790a373116716a83d987cb10b4a6',
  )
  await xrpSDK.kms.complete(tx.id, signedRawTx!)
  await xrpSDK.kms.delete(tx.id)

  const transaction = await xrpSDK.kms.sign(
    {
      id: pendingSignatureIds[0].id,
      hashes: pendingSignatureIds[0].hashes,
      serializedTransaction: pendingSignatureIds[0].serializedTransaction,
    },
    'snSFTHdvSYQKKkYntvEt8cnmZuPJB',
  )
}
