import { TatumCeloSDK } from '@tatumio/celo'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const celoSDK = TatumCeloSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function celoWalletExample() {
  const { mnemonic, xpub } = await celoSDK.wallet.generateWallet()

  const address = celoSDK.wallet.generateAddressFromXPub(mnemonic, 0)
  const privateKey = await celoSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const addressFromXpub = celoSDK.wallet.generateAddressFromXPub(xpub, 0)
}
