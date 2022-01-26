import { TatumBtcSDK } from '@tatumio/btc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const btcSDK = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function btcWalletExample() {
  const { mnemonic, xpub } = await btcSDK.wallet.generateWallet()
  const address = btcSDK.wallet.generateAddressFromXPub(mnemonic, 0, { testnet: true })
  const privateKey = await btcSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const addressFromXpub = btcSDK.wallet.generateAddressFromXPub(xpub, 0, { testnet: true })
}
