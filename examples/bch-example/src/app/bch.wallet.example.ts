import { TatumBchSDK } from '@tatumio/bch'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const bchSDK = TatumBchSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bchWalletExample() {
  const { mnemonic, xpub } = await bchSDK.wallet.generateWallet()
  const address = bchSDK.wallet.generateAddressFromXPub(mnemonic, 0, { testnet: true })
  const privateKey = await bchSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const addressFromXpub = bchSDK.wallet.generateAddressFromXPub(xpub, 0, { testnet: true })
}
