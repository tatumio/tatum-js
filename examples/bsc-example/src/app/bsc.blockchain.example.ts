import { TatumBscSDK } from '@tatumio/bsc'

const bscSDK = TatumBscSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function bscBlockchainExample() {
  // Get gasLimit and gasPrice for a transaction
  // https://apidoc.tatum.io/tag/Blockchain-fees#operation/BscEstimateGas
  const gasInfo = await bscSDK.blockchain.estimateGas({
    from: '0xfb99f8ae9b70a0c8cd96ae665bbaf85a7e01a2ef',
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    amount: '100000',
    data: 'My note to recipient.',
  })

  // Get transaction details by hash
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGetTransaction
  const transaction = await bscSDK.blockchain.get(
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )

  // Get block by hash
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGetBlock
  const block = await bscSDK.blockchain.getBlock(
    '0x305c58c8c62399097f1ea702e337f13be6b3a3ed28867d530d8a03191f040b9c',
  )

  // Get current block
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGetCurrentBlock
  const currentBlock = await bscSDK.blockchain.getCurrentBlock()

  // Get transaction count of an address
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGetTransactionCount
  const transactionsCount = await bscSDK.blockchain.getTransactionsCount(
    '0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B',
  )
}
