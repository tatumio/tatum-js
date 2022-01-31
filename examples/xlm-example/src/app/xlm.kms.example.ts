import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumXlmSDK } from '@tatumio/xlm'

const xlmSDK = TatumXlmSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function xlmKmsExample() {
  const pendingSignatureIds = await xlmSDK.kms.getAllPending()
  const tx = await xlmSDK.kms.get(pendingSignatureIds.id)

  await xlmSDK.kms.complete(pendingSignatureIds.id, pendingSignatureIds.txId!)
  await xlmSDK.kms.delete(pendingSignatureIds.id)

  const transaction = await xlmSDK.kms.sign(
    {
      id: pendingSignatureIds.id,
      hashes: pendingSignatureIds.hashes,
      serializedTransaction: pendingSignatureIds.serializedTransaction,
    },
    'SCVVKNLBHOWBNJYHD3CNROOA2P3K35I5GNTYUHLLMUHMHWQYNEI7LVED',
    true,
  )
}
