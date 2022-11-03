import { TatumAlgoSDK } from '@tatumio/algo'
import { sdkArguments } from '../index'

export async function algoBlockchainExample() {
  const algoSDK = TatumAlgoSDK(sdkArguments)

  // Get current block
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGetCurrentBlock
  const currentBlock = await algoSDK.blockchain.getCurrentBlock()
  console.log(`Current block in blockchain is ${currentBlock}.`)

  // Get block by block round number
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGetBlock
  const roundNumber = 16775567
  const block = await algoSDK.blockchain.getBlock(roundNumber)
  console.log(`Timestamp in block ${roundNumber} is ${block.timestamp}.`)

  // Get transaction details by hash
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGetTransaction
  const txid = 'LXEBXIBDAIF72NRI76SU252QSOGFCKEHTG7AI4P6W25V35PETU3Q'
  const tx = await algoSDK.blockchain.getTransaction(txid)
  console.log(`Fee for transaction is ${tx.fee}.`)

  // // skip this - took too long
  // // Get transactions between from and to
  // // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGetPayTransactionsByFromTo
  // const from = '2021-05-01T20:44:39Z'
  // const to = '2021-06-01T20:44:39Z'
  // const response = await algoSDK.blockchain.getPayTransactionByFromTo(from, to)
  // console.log(`Found ${response.transactions.length} transactions.`)
}
