import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumXlmSDK } from '@tatumio/xlm'

const xlmSDK = TatumXlmSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function xlmKmsExample() {
  const pendingSignatureIds = await xlmSDK.kms.getAllPending()
  const tx = await xlmSDK.kms.get(pendingSignatureIds[0].id)

  const signedRawTx = await xlmSDK.kms.sign(
    tx,
    '0x9483c22a4b68745d41500ba87d2a66f7b220790a373116716a83d987cb10b4a6',
    true,
  )
  await xlmSDK.kms.complete(tx.id, signedRawTx!)
  await xlmSDK.kms.delete(tx.id)

  const transaction = await xlmSDK.kms.sign(
    {
      id: pendingSignatureIds[0].id,
      hashes: pendingSignatureIds[0].hashes,
      serializedTransaction: pendingSignatureIds[0].serializedTransaction,
    },
    'SCVVKNLBHOWBNJYHD3CNROOA2P3K35I5GNTYUHLLMUHMHWQYNEI7LVED',
    true,
  )
}
