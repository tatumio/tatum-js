import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumXrpSDK } from '@tatumio/xrp'

const xrpSDK = TatumXrpSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function xrpKmsExample() {
  const pendingSignatureIds = await xrpSDK.kms.getAllPending()
  const tx = await xrpSDK.kms.get(pendingSignatureIds.id)

  await xrpSDK.kms.complete(pendingSignatureIds.id, pendingSignatureIds.txId!)
  await xrpSDK.kms.delete(pendingSignatureIds.id)

  const transaction = await xrpSDK.kms.sign(
    {
      id: pendingSignatureIds.id,
      hashes: pendingSignatureIds.hashes,
      serializedTransaction: pendingSignatureIds.serializedTransaction,
    },
    'snSFTHdvSYQKKkYntvEt8cnmZuPJB',
  )
}
