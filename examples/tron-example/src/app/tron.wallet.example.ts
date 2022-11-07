import { TatumTronSDK } from '@tatumio/tron'

const tronSDK = TatumTronSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function tronWalletExample() {
  // Generate TRON wallet
  // https://apidoc.tatum.io/tag/Tron#operation/GenerateTronwallet
  const { mnemonic, xpub } = await tronSDK.wallet.generateWallet()

  // Generate public address from xpub
  // https://apidoc.tatum.io/tag/Tron#operation/TronGenerateAddress
  const address = tronSDK.wallet.generateAddressFromXPub(xpub, 0)
  console.log(`Public address is ${address}`)

  // Generate private key from mnemonic
  // https://apidoc.tatum.io/tag/Tron#operation/TronGenerateAddressPrivateKey
  const privateKey = await tronSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  console.log(`private key is ${privateKey}`)
}
