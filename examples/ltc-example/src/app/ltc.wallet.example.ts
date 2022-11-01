import { TatumLtcSDK } from '@tatumio/ltc'

export async function ltcWalletExample() {
  const ltcSDK = TatumLtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Generate a LTC wallet
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcGenerateWallet
  const { mnemonic, xpub } = await ltcSDK.wallet.generateWallet(undefined, { testnet: true })
  console.log(`Mnemonic: ${mnemonic}`)
  console.log(`Xpub: ${xpub}`)

  // Generate an LTC private key
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcGenerateAddressPrivateKey
  const privateKey = await ltcSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  console.log(`Private key: ${privateKey}`)

  // Generate LTC deposit address from xpub
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcGenerateAddress
  const addressFromXpub = ltcSDK.wallet.generateAddressFromXPub(xpub, 0, { testnet: true })
  console.log(`Address from xpub: ${addressFromXpub}`)
}
