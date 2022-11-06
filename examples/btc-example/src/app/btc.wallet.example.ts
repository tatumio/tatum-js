import { TatumBtcSDK } from '@tatumio/btc'

export async function btcWalletExample() {
  const btcSDK = TatumBtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Generate a BTC wallet
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/BTCGenerateWallet
  const { mnemonic, xpub } = await btcSDK.wallet.generateWallet(undefined, { testnet: true })
  console.log(`Mnemonic: ${mnemonic}`)
  console.log(`Xpub: ${xpub}`)

  // Generate an BTC private key
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/BTCGenerateAddressPrivateKey
  const privateKey = await btcSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  console.log(`Private key: ${privateKey}`)

  // Generate BTC deposit address from xpub
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/BTCGenerateAddress
  const addressFromXpub = btcSDK.wallet.generateAddressFromXPub(xpub, 0, { testnet: true })
  console.log(`Address from xpub: ${addressFromXpub}`)
}
