import { TatumCeloSDK } from '@tatumio/celo'

const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function celoBlockchainExample() {
  // Get transaction details by hash
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGetTransaction
  const transaction = await celoSDK.blockchain.getTransaction(
    '0x6d5e5259a8ec276682b65631fd95bd287ead7dd42be8b7688238212ff3110530',
  )
  console.log(`Transaction: `, transaction)

  // Get block by hash
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGetBlock
  const block = await celoSDK.blockchain.getBlock(
    '0x81965b8e8665b51687f552704fbea2753f4517fc5d06610eeb62ef114b8840b3',
  )
  console.log(`Block: `, block)

  // Get current block
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGetCurrentBlock
  const currentBlock = await celoSDK.blockchain.getCurrentBlock()
  console.log(`Current block: `, currentBlock)

  // Get transaction count of an address
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGetTransactionCount
  const transactionsCount = await celoSDK.blockchain.getTransactionsCount(
    '0xcd6f113e9fe6c79b6dc8fcd7524948fe9f735921',
  )
  console.log(`Transactions count: `, transactionsCount)

  // Get transactions by address
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGetTransactionCount
  const pageSize = 20
  const transactions = await celoSDK.blockchain.getAccountTransactions(
    '0xcd6f113e9fe6c79b6dc8fcd7524948fe9f735921',
    pageSize,
  )
  console.log(`Address Transactions: `, transactions)
}
