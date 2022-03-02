import { TatumKlaytnSDK } from '@tatumio/klaytn'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const klaytnSDK = TatumKlaytnSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function klaytnWalletExample() {
  const { mnemonic, xpub } = await klaytnSDK.wallet.generateWallet()

  const address = klaytnSDK.wallet.generateAddressFromXPub(mnemonic, 0)
  const privateKey = await klaytnSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const addressFromXpub = klaytnSDK.wallet.generateAddressFromXPub(xpub, 0)
}
