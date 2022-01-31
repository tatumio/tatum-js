import { TatumSDK } from '@tatumio/tatum'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { Blockchain } from '@tatumio/shared-core'

const sdk = TatumSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function sdkKmsExample() {
  const signatureIds = await sdk.kms.getAllPending(Blockchain.BSC)
  const tx = await sdk.kms.get(signatureIds.id)
  await sdk.kms.complete(tx.id, tx.txId!)
  await sdk.kms.delete(tx.id)
}
