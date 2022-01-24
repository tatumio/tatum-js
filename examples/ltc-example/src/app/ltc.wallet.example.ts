import { TatumLtcSDK } from '@tatumio/ltc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const ltcSDK = TatumLtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ltcWalletExample() {
  const { mnemonic, xpub } = await ltcSDK.wallet.generateWallet()
  const address = ltcSDK.wallet.generateAddressFromXPub(mnemonic, 0, { testnet: true })
  const privateKey = await ltcSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const addressFromXpub = ltcSDK.wallet.generateAddressFromXPub(xpub, 0, { testnet: true })
}
