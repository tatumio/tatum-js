import { TatumKlaytnSDK } from '@tatumio/klaytn'

const klaytnSDK = TatumKlaytnSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function klaytnWalletExample() {
  // Generate KLAYTN wallet
  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGenerateWallet
  const { mnemonic, xpub } = await klaytnSDK.wallet.generateWallet()
  console.log(`Generated wallet with: \nmnemonic ${mnemonic}\nxpub ${xpub}`)

  // Generate KLAYTN private key
  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGenerateAddressPrivateKey
  const index = 0
  const privateKey = await klaytnSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, index, { testnet: true })
  console.log(`private for index ${index} generated is ${privateKey}`)

  // Generate KLAYTN account address from Extended public key
  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGenerateAddress
  const addressFromXpub = klaytnSDK.wallet.generateAddressFromXPub(xpub, index)
  console.log(`Address generated from xpub with index ${index} is ${addressFromXpub}`)
}
