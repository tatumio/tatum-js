import { TatumAlgoSDK } from '@tatumio/algo'

const algoSDK = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function algoWalletExample() {
  // Generate an Algorand wallet.
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGenerateWallet
  const { address, secret } = await algoSDK.wallet.generateWallet()
  console.log(`Generated wallet with: \naddress ${address}\nsecret ${secret}`)

  // Generate an address from the private key.
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGenerateAddress
  const addressFromPrivateKey = await algoSDK.wallet.generateAddressFromPrivatetKey(secret)
  console.log(`addressFromPrivateKey is ${addressFromPrivateKey}`)
}
