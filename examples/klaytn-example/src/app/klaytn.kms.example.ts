import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumKlaytnSDK } from '@tatumio/klaytn'

const klaytnSDK = TatumKlaytnSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function klaytnKmsExample() {
  const pendingSignatureIds = await klaytnSDK.kms.getAllPending()
  const tx = await klaytnSDK.kms.get(pendingSignatureIds[0].id)

  const signedRawTx = await klaytnSDK.kms.sign(
    tx,
    '0x9483c22a4b68745d41500ba87d2a66f7b220790a373116716a83d987cb10b4a6',
  )
  await klaytnSDK.kms.complete(tx.id, signedRawTx!)
  await klaytnSDK.kms.delete(tx.id)
}
