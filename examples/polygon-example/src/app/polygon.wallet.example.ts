import { TatumPolygonSDK } from '@tatumio/polygon'

const polygonSDK = TatumPolygonSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const testnet = true

export async function polygonWalletExample() {
  // Generate POLYGON wallet
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateWallet
  const { mnemonic, xpub } = await polygonSDK.wallet.generateWallet(undefined, { testnet })
  console.log(`Generated wallet with: \nmnemonic ${mnemonic}\nxpub ${xpub}`)

  // Generate public address from xpub
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateAddress
  const address = polygonSDK.wallet.generateAddressFromXPub(xpub, 0)
  console.log(`Public address is ${address}`)

  // Generate private key from mnemonic
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateAddressPrivateKey
  const privateKey = await polygonSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet })
  console.log(`private key is ${privateKey}`)
}
