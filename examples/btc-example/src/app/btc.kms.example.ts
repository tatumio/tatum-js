import { TatumBtcSDK } from '@tatumio/btc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const btcSDK = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function btcKmsExample() {
  const pendingSignatureIds = await btcSDK.kms.getAllPending()
  const tx = await btcSDK.kms.get(pendingSignatureIds.id)
  const signedRawTx = await btcSDK.kms.sign(pendingSignatureIds, [
    'L27j51mbxeWksCcWLUxUT7MhP4iQWDRsb72seDKNo6yERKPr3vtj',
  ])
  await btcSDK.kms.complete(pendingSignatureIds.id, pendingSignatureIds.txId!)
  await btcSDK.kms.delete(pendingSignatureIds.id)
}
