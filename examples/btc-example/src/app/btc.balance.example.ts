import { TatumBtcSDK } from '@tatumio/btc'

export async function btcBalanceExample(): Promise<void> {
  const btcSDK = TatumBtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Generate a BTC wallet
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGenerateWallet
  const { mnemonic, xpub } = await btcSDK.wallet.generateWallet(undefined, { testnet: true })
  console.log(`Mnemonic: ${mnemonic}`)
  console.log(`Xpub: ${xpub}`)

  // Create new blockchain address
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGenerateAddress
  const address = btcSDK.wallet.generateAddressFromXPub(xpub, 0, { testnet: true })
  console.log(`Address: ${address}.`)

  // Get balance of BTC
  // This example requires a funded blockchain address, you can top up your testnet balance with https://testnet-faucet.com/btc-testnet/
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetBalanceOfAddress
  const balance = await btcSDK.blockchain.getBlockchainAccountBalance(address)
  console.log(`Balance of ${address} : ${JSON.stringify(balance)}`)
}
