import { TatumAlgoSDK, TransferAlgoBlockchain } from '@tatumio/algo'
import { TransactionHash } from '@tatumio/api-client'
import { isTestnet, sdkArguments } from '../index'

export async function algoTxExample() {
  const algoSDK = TatumAlgoSDK(sdkArguments)

  // generate "from" and "to" addresses for wallets
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGenerateWallet
  const { secret } = algoSDK.wallet.generateWallet()
  const fromPrivateKey = secret
  const recipientAddress = algoSDK.wallet.generateWallet()
  const to = recipientAddress.address

  // FUND YOUR ACCOUNT WITH ALGOs FROM https://bank.testnet.algorand.network/

  // Send Algos to an Algorand account using private key
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandBlockchainTransfer
  const txData = (await algoSDK.transaction.send.signedTransaction(
    {
      amount: '0.1',
      fromPrivateKey,
      to,
    } as TransferAlgoBlockchain,
    isTestnet,
  )) as TransactionHash
  console.log(`Sent transaction using private key with ID ${txData.txId}`)
}
