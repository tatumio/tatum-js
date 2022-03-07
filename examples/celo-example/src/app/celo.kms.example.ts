import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumCeloSDK } from '@tatumio/celo'

const celoSDK = TatumCeloSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function celoKmsExample() {
  const pendingSignatureIds = await celoSDK.kms.getAllPending()
  const tx = await celoSDK.kms.get(pendingSignatureIds[0].id)

  // TODO: for celo
  // const signedRawTx = await celoSDK.kms.sign(tx, '0x9483c22a4b68745d41500ba87d2a66f7b220790a373116716a83d987cb10b4a6')
  // await celoSDK.kms.complete(tx.id, signedRawTx!)
  await celoSDK.kms.delete(tx.id)
}
