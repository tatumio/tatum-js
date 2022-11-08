import { TatumCeloSDK } from '@tatumio/celo'

const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function celoWalletExample() {
  // Generate CELO wallet
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGenerateWallet
  const { mnemonic, xpub } = await celoSDK.wallet.generateWallet(undefined, { testnet: true })
  console.log(`Generated wallet with: \nmnemonic ${mnemonic}\nxpub ${xpub}`)

  // Generate public address from xpub
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGenerateAddress
  const address = celoSDK.wallet.generateAddressFromXPub(xpub, 0)
  console.log(`Public address is ${address}`)

  // Generate private key from mnemonic
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGenerateAddressPrivateKey
  const privateKey = await celoSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  console.log(`private key is ${privateKey}`)
}
