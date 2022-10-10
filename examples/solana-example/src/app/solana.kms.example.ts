import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumSolanaSDK } from '@tatumio/solana'

const solanaSDK = TatumSolanaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function solanaKmsExample() {
  const signedRawTx = await solanaSDK.kms.sign(
    {
      hashes: ['5FPSzkTsjZDBigU3ZagvkcwSPimt4K6voqrN9uUNVzWDBeRXWVH3uMarDPpSfrS7sFQeyKyDd5KpbdCrL3EWEP59'],
      id: 'c83f8818db43d9ba4accfe454aa44fc33123d47a4f89d47b314d6748eb0e9bc9',
      serializedTransaction: 'c83f8818db43d9ba4accfe454aa44fc33123d47a4f89d47b314d6748eb0e9bc9',
    },
    [
      '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
    ],
  )

  const pendingSignatureIds = await solanaSDK.kms.getAllPending()
  const tx = await solanaSDK.kms.get(pendingSignatureIds[0].id)

  await solanaSDK.kms.complete(tx.id, signedRawTx!)
  await solanaSDK.kms.delete(tx.id)
}
