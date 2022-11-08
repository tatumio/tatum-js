import { TatumXdcSDK } from '@tatumio/xdc'

const testnet = true
const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function xdcWalletExample() {
  // Generate XDC wallet
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGenerateWallet
  const { mnemonic, xpub } = await xdcSDK.wallet.generateWallet(undefined, { testnet })
  console.log(`Generated wallet with: \nmnemonic ${mnemonic}\nxpub ${xpub}`)

  // Generate XDC private key
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGenerateAddressPrivateKey
  const index = 0
  const privateKey = await xdcSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, index, { testnet })
  console.log(`private for index ${index} generated is ${privateKey}`)

  // Generate XDC account address from Extended public key
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGenerateAddress
  const addressFromXpub = xdcSDK.wallet.generateAddressFromXPub(xpub, index)
  console.log(`Address generated from xpub with index ${index} is ${addressFromXpub}`)
}
