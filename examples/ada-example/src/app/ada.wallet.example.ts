import { TatumAdaSDK } from '@tatumio/ada'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const adaSDK = TatumAdaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function adaWalletExample() {
  const { mnemonic, xpub } = await adaSDK.wallet.generateWallet()
  const address = adaSDK.wallet.generateAddressFromXPub(xpub, 0, true)
  const privateKey = await adaSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const wallet = adaSDK.wallet.generateBlockchainWallet(mnemonic)
}
