import { TatumOneSDK } from '@tatumio/one'

const oneSDK = TatumOneSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function oneWalletExample() {
  // Generate ONE wallet
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGenerateWallet
  const { mnemonic, xpub } = await oneSDK.wallet.generateWallet()
  console.log(`Generated wallet with: \nmnemonic ${mnemonic}\nxpub ${xpub}`)

  // Generate ONE private key
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGenerateAddressPrivateKey
  const index = 0
  const privateKey = await oneSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, index, { testnet: true })
  console.log(`private for index ${index} generated is ${privateKey}`)

  // Generate ONE account address from Extended public key
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGenerateAddress
  const addressFromXpub = oneSDK.wallet.generateAddressFromXPub(xpub, index)
  console.log(`Address generated from xpub with index ${index} is ${addressFromXpub}`)

  // Transform HEX address to Bech32 ONE address format
  // https://apidoc.tatum.io/tag/Harmony#operation/OneFormatAddress
  const hexAddress = '0xa7673161CbfE0116A4De9E341f8465940c2211d4'
  const bech32Address = oneSDK.wallet.toBech32Address(hexAddress)
  console.log(`Hex Address = ${hexAddress} -> Bech32 address = ${bech32Address}`)
}
