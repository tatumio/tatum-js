import { TatumKcsSDK } from '@tatumio/kcs'

const kcsSDK = TatumKcsSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function kcsBlockchainExample() {
  // Get gasLimit and gasPrice for a transaction
  // https://apidoc.tatum.io/tag/Blockchain-fees#operation/KcsEstimateGas
  const gasInfo = await kcsSDK.blockchain.estimateGas({
    from: '0xfb99f8ae9b70a0c8cd96ae665bbaf85a7e01a2ef',
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    amount: '100000',
    data: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
  })
  console.log(`Gas estimate`, gasInfo)

  // Get transaction details by hash
  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGetTransaction
  const transaction = await kcsSDK.blockchain.getTransaction(
    '0xc8fd5133bbf2b81a39066b33a9864cc6848756bf6a39f909cc92d60204c5c349',
  )
  console.log(`Transaction: `, transaction)

  // Get block by hash
  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGetBlock
  const block = await kcsSDK.blockchain.getBlock(
    '0x1573faea4d682be5e1adee63497a55b39aaa6dd1b3645aab99b2fe4d562ab8ac',
  )
  console.log(`Block: `, block)

  // Get current block
  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGetCurrentBlock
  const currentBlock = await kcsSDK.blockchain.getCurrentBlock()
  console.log(`Current block: `, currentBlock)

  // Get transaction count of an address
  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGetTransactionCount
  const transactionsCount = await kcsSDK.blockchain.getTransactionsCount(
    '0xab90f4f1f9716cc60fa16d02abc3272d09de415c',
  )
  console.log(`Transactions count: `, transactionsCount)
}
