import { TatumBscSDK } from '@tatumio/bsc'

const bscSDK = TatumBscSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function bscBlockchainExample() {
  // Get gasLimit and gasPrice for a transaction
  // https://apidoc.tatum.io/tag/Blockchain-fees#operation/BscEstimateGas
  const gasInfo = await bscSDK.blockchain.estimateGas({
    from: '0xfb99f8ae9b70a0c8cd96ae665bbaf85a7e01a2ef',
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    amount: '100000',
    data: '0xd983010110846765746889676f312e31372e3133856c696e7578000059afa6a38d80c35c8aa4db9aae6c8a737f8d134e5fbc896269700a2cbf50587f712aef3b3fd2527fd5cef57154ef4fe1d7ddbb3c307e981d8325f376091c1aa7264823b401',
  })
  console.log(`Gas estimate: ${gasInfo}`)

  // Get transaction details by hash
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGetTransaction
  const transaction = await bscSDK.blockchain.get(
    '0xfae9494fee7c168ccbb79bc6785bb343c6108f2aac38a64f0a25b5efae51d4f1',
  )
  console.log(`Transaction: ${transaction}`)

  // Get block by hash
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGetBlock
  const block = await bscSDK.blockchain.getBlock(
    '0x30454a103e3a0c94fa715eff8f73fafc19928ab7c5b3056f5fa3d667a9fb3669',
  )
  console.log(`Block: ${block}`)

  // Get current block
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGetCurrentBlock
  const currentBlock = await bscSDK.blockchain.getCurrentBlock()
  console.log(`Current block: ${currentBlock}`)

  // Get transaction count of an address
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGetTransactionCount
  const transactionsCount = await bscSDK.blockchain.getTransactionsCount(
    '0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B',
  )
  console.log(`Transactions count: ${transactionsCount}`)
}
