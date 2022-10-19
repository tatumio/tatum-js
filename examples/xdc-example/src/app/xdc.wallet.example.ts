import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function xdcWalletExample() {
  const { mnemonic, xpub } = await xdcSDK.wallet.generateWallet()

  const address = xdcSDK.wallet.generateAddressFromXPub(mnemonic, 0)
  const privateKey = await xdcSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const addressFromXpub = xdcSDK.wallet.generateAddressFromXPub(xpub, 0)
}
