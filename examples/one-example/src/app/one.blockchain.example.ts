import { TatumOneSDK } from '@tatumio/one'

const oneSDK = TatumOneSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function oneBlockchainExample() {
  // Get transaction details by hash
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGetTransaction
  const transaction = await oneSDK.blockchain.get(
    '0x73e25d4f202b983b97afeea547c6b3b7fda8a88161ee2d94198e35f41f8c9dfa',
  )
  console.log(`Transaction: ${JSON.stringify(transaction)}`)

  // Get block by hash
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGetBlock
  const block = await oneSDK.blockchain.getBlock(
    '0x041676cff3ecac486c9e076176554987aa073bd9bd56f4a078a58ade01ea467a',
  )
  console.log(`Block: ${JSON.stringify(block)}`)

  // Get current block
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGetCurrentBlock
  const currentBlock = await oneSDK.blockchain.getCurrentBlock()
  console.log(`Current block: ${JSON.stringify(currentBlock)}`)

  // Get transaction count of an address
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGetTransactionCount
  const transactionsCount = await oneSDK.blockchain.getTransactionsCount(
    'one1s3va3rguafv8gnf5mfnm76qxq5z9jjt4z4kjyf',
  )
  console.log(`Transactions count: ${transactionsCount}`)
}
