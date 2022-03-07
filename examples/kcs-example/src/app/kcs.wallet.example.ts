import { TatumKcsSDK } from '@tatumio/kcs'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const kcsSDK = TatumKcsSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function kcsWalletExample() {
  const { mnemonic, xpub } = await kcsSDK.wallet.generateWallet()

  const address = kcsSDK.wallet.generateAddressFromXPub(mnemonic, 0)
  const privateKey = await kcsSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const addressFromXpub = kcsSDK.wallet.generateAddressFromXPub(xpub, 0)
}
