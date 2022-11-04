import { TatumCeloSDK } from '@tatumio/celo'

const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function celoBlockchainExample() {
  // Get transaction details by hash
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGetTransaction
  const transaction = await celoSDK.blockchain.get(
    '0xd4f6e4e704d9f66cdbb3decdfbfc93b9b5e7e7d85f7870e8c45b1e360acba9b3',
  )
  console.log(`Transaction: ${JSON.stringify(transaction)}`)

  // Get block by hash
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGetBlock
  const block = await celoSDK.blockchain.getBlock(
    '0x3d8bfd1cc35dff705928c4f33c5de6aceb6bd06354eff0d1ea741b754d200da5',
  )
  console.log(`Block: ${JSON.stringify(block)}`)

  // Get current block
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGetCurrentBlock
  const currentBlock = await celoSDK.blockchain.getCurrentBlock()
  console.log(`Current block: ${JSON.stringify(currentBlock)}`)

  // Get transaction count of an address
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGetTransactionCount
  const transactionsCount = await celoSDK.blockchain.getTransactionsCount(
    '0x5f70408c785184fa55bd06a26e25c34574805b36',
  )
  console.log(`Transactions count: ${transactionsCount}`)
}
