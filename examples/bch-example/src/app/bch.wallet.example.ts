import { TatumBchSDK } from '@tatumio/bch'

export async function bchWalletExample() {
  const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Generate a Bitcoin Cash wallet.
  // https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGenerateWallet
  const { mnemonic, xpub } = await bchSDK.wallet.generateWallet(null, { testnet: true })
  console.log(`Mnemonic: ${mnemonic} - xpub: ${xpub}`)

  // Generate an address with a specified index from the wallet's xpub.
  // https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGenerateAddress
  const address = bchSDK.wallet.generateAddressFromXPub(xpub, 0, { testnet: true })
  console.log('Address: ', address)

  // Generate the private key for the address with the specified index from the wallet's mnemonic.
  // https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGenerateAddressPrivateKey
  const privateKey = await bchSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  console.log('Private key: ', privateKey)

  // Generate an address from the private key.
  const addressFromPrivateKey = bchSDK.wallet.generateAddressFromPrivateKey(privateKey, { testnet: true })
  console.log('Address (from privateKey): ', addressFromPrivateKey)
}
