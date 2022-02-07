import { TatumTronSDK } from '@tatumio/tron'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const tronSDK = TatumTronSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function tronWalletExample() {
  const { mnemonic, xpub } = await tronSDK.wallet.generateWallet()

  const address = tronSDK.wallet.generateAddressFromXPub(mnemonic, 0)
  const privateKey = await tronSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const addressFromXpub = tronSDK.wallet.generateAddressFromXPub(xpub, 0)
}
