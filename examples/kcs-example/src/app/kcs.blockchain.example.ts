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
  const transaction = await kcsSDK.blockchain.get(
    '0xfae9494fee7c168ccbb79bc6785bb343c6108f2aac38a64f0a25b5efae51d4f1',
  )
  console.log(`Transaction: ${transaction}`)

  // Get block by hash
  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGetBlock
  const block = await kcsSDK.blockchain.getBlock(
    '0x30454a103e3a0c94fa715eff8f73fafc19928ab7c5b3056f5fa3d667a9fb3669',
  )
  console.log(`Block: ${block}`)

  // Get current block
  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGetCurrentBlock
  const currentBlock = await kcsSDK.blockchain.getCurrentBlock()
  console.log(`Current block: ${currentBlock}`)

  // Get transaction count of an address
  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGetTransactionCount
  const transactionsCount = await kcsSDK.blockchain.getTransactionsCount(
    '0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B',
  )
  console.log(`Transactions count: ${transactionsCount}`)
}
