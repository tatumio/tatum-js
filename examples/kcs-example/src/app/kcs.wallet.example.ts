import { TatumKcsSDK } from '@tatumio/kcs'

const kcsSDK = TatumKcsSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function kcsWalletExample() {
  // Generate KCS wallet
  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGenerateWallet
  const { mnemonic, xpub } = await kcsSDK.wallet.generateWallet(undefined, { testnet: true })
  console.log(`Generated wallet with: \nmnemonic ${mnemonic}\nxpub ${xpub}`)

  // Generate public address from xpub
  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGenerateAddress
  const address = kcsSDK.wallet.generateAddressFromXPub(xpub, 0)
  console.log(`Public address is ${address}`)

  // Generate private key from mnemonic
  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGenerateAddressPrivateKey
  const privateKey = await kcsSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  console.log(`private key is ${privateKey}`)
}
