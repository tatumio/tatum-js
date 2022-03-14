import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumTerraSDK } from '@tatumio/terra'

const terraSDK = TatumTerraSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function terraKmsExample() {
  const pendingSignatureIds = await terraSDK.kms.getAllPending()
  const tx = await terraSDK.kms.get(pendingSignatureIds[0].id)

  const signedRawTx = await terraSDK.kms.sign(
    tx,
    '0x9483c22a4b68745d41500ba87d2a66f7b220790a373116716a83d987cb10b4a6',
    true,
  )
  await terraSDK.kms.complete(tx.id, signedRawTx!)
  await terraSDK.kms.delete(tx.id)

  const transaction = await terraSDK.kms.sign(
    {
      id: pendingSignatureIds[0].id,
      hashes: pendingSignatureIds[0].hashes,
      serializedTransaction: pendingSignatureIds[0].serializedTransaction,
    },
    'snSFTHdvSYQKKkYntvEt8cnmZuPJB',
    true,
  )
}
