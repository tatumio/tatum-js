import { TatumEthSDK } from '@tatumio/eth'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const ethSDK = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ethWalletExample() {
  const { mnemonic, xpub } = await ethSDK.wallet.generateWallet()

  const address = ethSDK.wallet.generateAddressFromXPub(mnemonic, 0)
  const privateKey = await ethSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const addressFromXpub = ethSDK.wallet.generateAddressFromXPub(xpub, 0)
}
