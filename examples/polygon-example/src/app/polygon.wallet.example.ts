import { TatumPolygonSDK } from '@tatumio/polygon'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const polygonSDK = TatumPolygonSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function polygonWalletExample() {
  const { mnemonic, xpub } = await polygonSDK.wallet.generateWallet()

  const address = polygonSDK.wallet.generateAddressFromXPub(mnemonic, 0)
  const privateKey = await polygonSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const addressFromXpub = polygonSDK.wallet.generateAddressFromXPub(xpub, 0)
}