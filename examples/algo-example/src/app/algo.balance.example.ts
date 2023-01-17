import { TatumAlgoSDK } from '@tatumio/algo'

const algoSDK = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function algoBalanceExample() {
  // Generate an Algorand wallet.
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGenerateWallet
  const { address, secret } = algoSDK.wallet.generateWallet()
  console.log(`Public address is ${address} and secret: ${secret}.`)

  // Fund the Algorand account with ALGO using https://bank.testnet.algorand.network/.
  // Get the balance of the account.
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGetBalance
  const balance = await algoSDK.blockchain.getBlockchainAccountBalance(address)
  console.log(`Account ${address} balance is ${JSON.stringify(balance)}.`)
}
