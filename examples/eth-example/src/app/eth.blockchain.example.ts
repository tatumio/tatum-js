import { TatumEthSDK } from '@tatumio/eth'

const ethSDK = TatumEthSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function ethBlockchainExample() {
  const address = '0x0569663566e3119ff84130e1455bd5e3f2a3ed8f'
  const blockHash = '0xe7d6dd8c52fddec0cf1e094947cf7a74d8241d6b4f6c945c811c93b7569885f5'
  const transactionHash = '0xfbf1a270a3554414dbebaab40d18f1fe462688b5fc9e4312bb87bd855226180c'

  // Get gasLimit and gasPrice for a transaction
  // https://apidoc.tatum.io/tag/Blockchain-fees#operation/EthEstimateGas
  const gasInfo = await ethSDK.blockchain.estimateGas({
    from: '0x0569663566e3119ff84130e1455bd5e3f2a3ed8f',
    to: '0xbc18a9166df0c68459b7e35b4a3d4ea2179cf9fb',
    amount: '1',
  })
  console.log('Gas estimate: ', gasInfo)

  // Get transaction details by hash
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGetTransaction
  const transaction = await ethSDK.blockchain.get(transactionHash)
  console.log('Transaction: ', transaction)

  // Get Balance on account
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGetBalance
  const { balance } = await ethSDK.blockchain.getBlockchainAccountBalance(address)
  console.log(`Balance`, balance)

  // Get block by hash
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGetBlock
  const block = await ethSDK.blockchain.getBlock(blockHash)
  console.log(`Block`, block)

  // Get current block
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGetCurrentBlock
  const currentBlock = await ethSDK.blockchain.getCurrentBlock()
  console.log(`Current block`, currentBlock)

  // Get transaction count of an address
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGetTransactionCount
  const transactionsCount = await ethSDK.blockchain.getTransactionsCount(address)
  console.log(`Transaction count for address ${address}`, transactionsCount)
}
