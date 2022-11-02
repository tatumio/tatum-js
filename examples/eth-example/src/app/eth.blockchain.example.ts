import { TatumEthSDK } from '@tatumio/eth'

const ethSDK = TatumEthSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function ethBlockchainExample() {
  // Broadcast transaction on the blockchain
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthBroadcast
  const broadcastHash = await ethSDK.blockchain.broadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  console.log(`Transaction broadcast with transaction id ${broadcastHash.txId}`)

  // Estimate gas of a transaction
  // https://apidoc.tatum.io/tag/Blockchain-fees#operation/EthEstimateGas
  const gasInfo = await ethSDK.blockchain.estimateGas({
    from: '0xfb99f8ae9b70a0c8cd96ae665bbaf85a7e01a2ef',
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    amount: '100000',
    data: 'My note to recipient.',
  })
  console.log(`Gas estimation info ${JSON.stringify(gasInfo)}`)

  // Batch Estimate gas of multiple transactions
  // https://apidoc.tatum.io/tag/Blockchain-fees#operation/EthEstimateGasBatch
  const gasInfoBatch = await ethSDK.blockchain.estimateGasBatch({
    estimations: [
      {
        from: '0xfb99f8ae9b70a0c8cd96ae665bbaf85a7e01a2ef',
        to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
        contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
        amount: '100000',
        data: 'My note to recipient.',
      },
    ],
  })

  console.log(`Batch Gas estimation info ${JSON.stringify(gasInfoBatch.result)}`)

  // Get ethereum transaction from the block
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGetTransaction
  const transaction = await ethSDK.blockchain.get(
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )
  console.log(`Transaction info ${JSON.stringify(transaction)}`)

  // Get transaction block by hash
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGetBlock
  const block = await ethSDK.blockchain.getBlock(
    '0x527d2f059244f7cbe1ec84aa75e7d1637463a793d82cf7015b3c2a7a5a3ec053',
  )
  console.log(`Block details is ${JSON.stringify(block)}`)

  // Get current ethereum block number
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGetCurrentBlock
  const currentBlock = await ethSDK.blockchain.getCurrentBlock()
  console.log(`Current block number is ${currentBlock}`)

  // Get transactions from an address
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGetTransactionByAddress
  const transactionsByAddress = await ethSDK.blockchain.getAccountTransactions(
    '0xdac17f958d2ee523a2206206994597c13d831ec7',
    10,
  )
  console.log(`Transaction info: ${JSON.stringify(transactionsByAddress)}`)

  // Get transaction counts from an address
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGetTransactionCount
  const transactionsCount = await ethSDK.blockchain.getTransactionsCount(
    '0xdac17f958d2ee523a2206206994597c13d831ec7',
  )
  console.log(`Transaction count: ${transactionsCount}`)
}
