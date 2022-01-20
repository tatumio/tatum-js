import { TatumDogeSDK } from '@tatumio/doge'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const dogeSDK = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function dogeWalletExample() {
  const { mnemonic, xpub } = await dogeSDK.wallet.generateWallet()
  const address = dogeSDK.wallet.generateAddressFromXPub(mnemonic, 0, { testnet: true })
  const privateKey = await dogeSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const addressFromXpub = dogeSDK.wallet.generateAddressFromXPub(xpub, 0, { testnet: true })
}
