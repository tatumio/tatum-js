import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumFlowSDK } from '@tatumio/flow'

const flowSDK = TatumFlowSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function flowKmsExample() {
  const pendingSignatureIds = await flowSDK.kms.getAllPending()
  const tx = await flowSDK.kms.get(pendingSignatureIds.id)

  await flowSDK.kms.complete(pendingSignatureIds.id, pendingSignatureIds.txId!)
  await flowSDK.kms.delete(pendingSignatureIds.id)

  const transaction = await flowSDK.kms.sign(
    {
      id: 'e11ca8f92f2d5dea7406e64ab8cb1780a8a19185d9ac670b16ca8c4f09f05add',
      hashes: ['26d3883e-4e17-48b3-a0ee-09a3e484ac83'],
      serializedTransaction: '3b4351560d3b454a4c1ae2485074b0786093058bfe2b28d436584311b1e433a4',
    },
    ['cTmS2jBWXgFaXZ2xG9jhn67TiyTshnMp3UedamzEhGm6BZV1vLgQ'],
    false,
  )
}
