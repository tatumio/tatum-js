import { TatumAlgoSDK } from '@tatumio/algo'

const algoSDK = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function algoBlockchainExample() {
  // Get the current block.
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGetCurrentBlock
  const currentBlock = await algoSDK.blockchain.getCurrentBlock()
  console.log(`Current block in blockchain is ${currentBlock}.`)

  // Get a block-by-block round number.
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGetBlock
  const roundNumber = currentBlock - 100
  const block = await algoSDK.blockchain.getBlock(roundNumber)
  console.log(`Timestamp in block ${roundNumber} is ${block.timestamp}.`)

  // Get information about a specific transaction.
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGetTransaction
  const txid = block?.txns[0]?.id || 'LXEBXIBDAIF72NRI76SU252QSOGFCKEHTG7AI4P6W25V35PETU3Q'
  const tx = await algoSDK.blockchain.getTransaction(txid)
  console.log(`Fee for transaction ${txid} is ${tx.fee}.`)
}
