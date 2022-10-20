import { TatumBchSDK } from '@tatumio/bch'


export async function bchWalletExample() {
  const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  
  // Generate wallet
  const { mnemonic, xpub } = await bchSDK.wallet.generateWallet()
  console.log(`Mnemonic: ${mnemonic} - xpub: ${xpub}`)

  // Generate Address from xpub with a given index
  const address = bchSDK.wallet.generateAddressFromXPub(xpub, 0, { testnet: true })
  console.log(address)

  // Generate PrivateKey from Mnemonic with a given index
  const privateKey = await bchSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  console.log(privateKey)

  // Generate address from privateKey
  const addressFromPrivateKey = bchSDK.wallet.generateAddressFromPrivateKey(privateKey, { testnet: true })
  console.log(addressFromPrivateKey)
}
