import { TatumBtcSDK } from '@tatumio/btc'

export async function btcWalletExample() {
  const btcSDK = TatumBtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Generate wallet
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGenerateWallet
  const { mnemonic, xpub } = await btcSDK.wallet.generateWallet()
  console.log(`Mnemonic: ${mnemonic} - xpub: ${xpub}`)

  // Generate Address from xpub with a given index
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGenerateAddress
  const address = btcSDK.wallet.generateAddressFromXPub(mnemonic, 0, { testnet: true })
  console.log(address)

  // Generate PrivateKey from Mnemonic with a given index
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGenerateAddressPrivateKey
  const privateKey = await btcSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  console.log(privateKey)

  // Generate address from privateKey
  const addressFromXpub = btcSDK.wallet.generateAddressFromXPub(xpub, 0, { testnet: true })
  console.log(addressFromXpub)
}
