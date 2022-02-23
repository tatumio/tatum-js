import { TatumEgldSDK } from '@tatumio/egld'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const egldSDK = TatumEgldSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function egldWalletExample() {
  const { mnemonic } = await egldSDK.wallet.generateWallet()

  const address = egldSDK.wallet.generateAddressFromXPub(mnemonic, 0)
  const privateKey = await egldSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const addressFromXpub = egldSDK.wallet.generateAddressFromXPub('xpub', 0)
}
