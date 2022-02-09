import { TatumDogeSDK } from '@tatumio/doge'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const dogeSDK = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function dogeKmsExample() {
  const pendingSignatureIds = await dogeSDK.kms.getAllPending()
  const tx = await dogeSDK.kms.get(pendingSignatureIds.id)
  const signedRawTx = await dogeSDK.kms.sign(pendingSignatureIds, [
    'L27j51mbxeWksCcWLUxUT7MhP4iQWDRsb72seDKNo6yERKPr3vtj',
  ])
  await dogeSDK.kms.complete(pendingSignatureIds.id, pendingSignatureIds.txId!)
  await dogeSDK.kms.delete(pendingSignatureIds.id)
}
