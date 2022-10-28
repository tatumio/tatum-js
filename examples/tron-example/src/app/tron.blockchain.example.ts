import { TatumTronSDK } from '@tatumio/tron'

const tronSDK = TatumTronSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function tronBlockchainExample() {
  // Get Tron account by address
  // https://apidoc.tatum.io/tag/Tron#operation/TronGetAccount
  const account = await tronSDK.blockchain.getAccount('TLXdNx49L9mfQjG17QfTAphShNtYB1RHp6')
  console.log('Account: ', account)

  // Get all transactions for a TRON account
  // https://apidoc.tatum.io/tag/Tron#operation/TronAccountTx
  const transactions = await tronSDK.blockchain.getTransactions('TLXdNx49L9mfQjG17QfTAphShNtYB1RHp6')
  console.log('Transactions: ', transactions)

  // Get transaction details by hash
  // https://apidoc.tatum.io/tag/Tron#operation/TronGetTransaction
  const transaction = await tronSDK.blockchain.getTransaction(
    '6451552ed7235cb63b2c369df5a5e190c77a275074e4c8b6b98c8e7a1be12b7c',
  )
  console.log('Transaction:', transaction)

  // Get TRC-20 transactions for a TRON account.
  // https://apidoc.tatum.io/tag/Tron#operation/TronAccountTx20
  const trc20Transactions = await tronSDK.blockchain.getTrc20Transactions(
    'TLXdNx49L9mfQjG17QfTAphShNtYB1RHp6',
  )
  console.log('Trc20 transactions: ', trc20Transactions)

  // Get block by hash
  // https://apidoc.tatum.io/tag/Tron#operation/TronGetBlock
  const block = await tronSDK.blockchain.getBlock(
    '0000000001b52c38ffec2d3d64c0412e337b685730ba9d9c25d448b5eeb8bf1f',
  )
  console.log('Block:', block)

  // Get current block
  // https://apidoc.tatum.io/tag/Tron#operation/TronGetCurrentBlock
  const currentBlock = await tronSDK.blockchain.getCurrentBlock()
  console.log('Current block: ', currentBlock)
}
