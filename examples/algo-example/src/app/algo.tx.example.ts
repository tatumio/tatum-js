import { TatumAlgoSDK, TransferAlgoBlockchain } from '@tatumio/algo'
import { TransactionHash } from '@tatumio/api-client'
import { algoAddress, algoSecret, isTestnet, sdkArguments } from '../index'

export async function algoTxExample() {
  const algoSDK = TatumAlgoSDK(sdkArguments)

  // generate "from" and "to" addresses for wallets
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGenerateWallet
  // const { address, secret } = algoSDK.wallet.generateWallet()
  const address = algoAddress
  const secret = algoSecret
  const privateKey = secret
  const recipientAddress = algoSDK.wallet.generateWallet()
  const to = recipientAddress.address

  // @TODO: remove
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGetBalance
  const { balance } = await algoSDK.blockchain.getBlockchainAccountBalance(address)
  console.log(`Account ${address} has ${balance} ALGOs.`)

  // FUND YOUR ACCOUNT WITH ALGOs FROM https://bank.testnet.algorand.network/

  // Send Algos to an Algorand account using private key
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandBlockchainTransfer
  const txData = (await algoSDK.transaction.signedTransaction(
    {
      amount: '0.1',
      fromPrivateKey: privateKey,
      to,
      // fee: '0.001',
    } as TransferAlgoBlockchain,
    isTestnet,
  )) as TransactionHash
  console.log(`Transaction using private key with ID ${txData.txId} is prepared to send`)
}
