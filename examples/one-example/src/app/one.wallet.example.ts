import { TatumOneSDK } from '@tatumio/one'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const oneSDK = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function oneWalletExample() {
  const { mnemonic, xpub } = await oneSDK.wallet.generateWallet()

  const address = oneSDK.wallet.generateAddressFromXPub(mnemonic, 0)
  const privateKey = await oneSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const addressFromXpub = oneSDK.wallet.generateAddressFromXPub(xpub, 0)
}
