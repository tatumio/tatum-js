import { TatumSDK } from '@tatumio/sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { Blockchain } from '@tatumio/shared-core'

const sdk = TatumSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function sdkKmsExample() {
  const signatureIds = await sdk.kms.getAllPending(Blockchain.BSC)
  const tx = await sdk.kms.get(signatureIds[0].id)
  // TODO: fix this
  // but general SDK for KMS doesn't have abstract method sign
  // const signedRawTx = await sdk.kms.sign(tx, '0x9483c22a4b68745d41500ba87d2a66f7b220790a373116716a83d987cb10b4a6')
  // await sdk.kms.complete(tx.id, signedRawTx!)
  await sdk.kms.delete(tx.id)
}
