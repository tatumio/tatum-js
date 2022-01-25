import { TatumBscSDK } from '@tatumio/bsc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const bscSDK = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bscWalletExample() {
  const { mnemonic, xpub } = await bscSDK.wallet.generateWallet()

  const address = bscSDK.wallet.generateAddressFromXPub(mnemonic, 0)
  const privateKey = await bscSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const addressFromXpub = bscSDK.wallet.generateAddressFromXPub(xpub, 0)
}