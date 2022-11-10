import { TatumEthSDK } from '@tatumio/eth'

const ethSDK = TatumEthSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function ethWalletExample() {
  // Generate ethereum wallet
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGenerateWallet
  const { mnemonic, xpub } = await ethSDK.wallet.generateWallet(undefined, { testnet: true })

  // Generate public address from xpub
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGenerateAddress
  const address = ethSDK.wallet.generateAddressFromXPub(xpub, 0)
  console.log(`Public address is ${address}`)

  // Generate private key from mnemonic
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGenerateAddressPrivateKey
  const privateKey = await ethSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  console.log(`private key is ${privateKey}`)
}
