import { TatumAlgoSDK } from '@tatumio/algo'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const algoSDK = TatumAlgoSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function algoWalletExample() {
  const { address, secret } = await algoSDK.wallet.generateWallet()

  const addressFromPrivateKey = algoSDK.wallet.generateAddressFromPrivatetKey(
    '72TCV5BRQPBMSAFPYO3CPWVDBYWNGAYNMTW5QHENOMQF7I6QLNMJWCJZ7A3V5YKD7QD6ZZPEHG2PV2ZVVEDDO6BCRGXWIL3DIUMSUCI',
  )
}
