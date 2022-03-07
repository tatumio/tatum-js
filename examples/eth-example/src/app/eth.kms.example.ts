import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumEthSDK } from '@tatumio/eth'

const ethSDK = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ethKmsExample() {
  const pendingSignatureIds = await ethSDK.kms.getAllPending()
  const tx = await ethSDK.kms.get(pendingSignatureIds[0].id)
  const signedRawTx = await ethSDK.kms.sign(
    tx,
    '0x254ac28e10916b3c2def004a37fec216649288ae71c8cac41faf106193263792',
  )
  await ethSDK.kms.complete(tx.id, signedRawTx!)
  await ethSDK.kms.delete(tx.id)
}
