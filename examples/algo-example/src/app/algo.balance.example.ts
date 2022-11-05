import { TatumAlgoSDK } from '@tatumio/algo'
import { sdkArguments } from '../index'

export async function algoBalanceExample() {
  const algoSDK = TatumAlgoSDK(sdkArguments)

  // Generate wallet
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGenerateWallet
  const { address, secret } = algoSDK.wallet.generateWallet()
  console.log(`Public address is ${address} and secret: ${secret}.`)

  // FUND YOUR ACCOUNT WITH ALGOs FROM https://bank.testnet.algorand.network/

  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGetBalance
  const balance = await algoSDK.blockchain.getBlockchainAccountBalance(address)
  console.log(`Account ${address} balance is ${JSON.stringify(balance)}.`)
}
