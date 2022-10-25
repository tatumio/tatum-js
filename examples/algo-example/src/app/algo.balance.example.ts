import { TatumAlgoSDK } from '@tatumio/algo'

export async function algoBalanceExample() {
  const algoSDK = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Generate wallet
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGenerateWallet
  const { address, secret } = algoSDK.wallet.generateWallet()

  console.log(`My public address is ${address} and secret: ${secret}.`)

  // FUND YOUR ACCOUNT WITH ALGOs FROM https://bank.testnet.algorand.network/

  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGetBalance
  const { balance } = await algoSDK.blockchain.getBlockchainAccountBalance(address)

  console.log(`Account ${address} has ${balance} ALGOs.`)
}
