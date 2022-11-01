import { TatumPolygonSDK } from '@tatumio/polygon'

const polygonSDK = TatumPolygonSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function polygonBlockchainExample() {
  // Get current block
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGetCurrentBlock
  const currentBlock = await polygonSDK.blockchain.getCurrentBlock()
  console.log(`Current block in blockchain is ${currentBlock}.`)

  // Get block by block number
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGetBlock
  const blockNumber = `${currentBlock - 100}`
  const block = await polygonSDK.blockchain.getBlock(blockNumber)
  console.log(`Timestamp in block ${blockNumber} is ${block.timestamp}.`)

  // Get transaction details by hash
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGetTransaction
  const hash = '0xf5b40cf3f36a14c02df07a4d771eb63241d2fbb42b5e7d5549c718f8bf6f36d5'
  const tx = await polygonSDK.blockchain.get(hash)
  console.log(`Fee for transaction is ${tx.gasUsed}.`)

  // Generate wallet
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateWallet
  const { mnemonic, xpub } = await polygonSDK.wallet.generateWallet()
  console.log(`Mnemonic for wallet is ${mnemonic} and extended public key is ${xpub}.`)

  // Generate account address from Extended public key
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateAddress
  const address = polygonSDK.wallet.generateAddressFromXPub(xpub, 0)
  console.log(`Public address is ${address}.`)

  // Get count of outgoing transactions for address
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGetTransactionCount
  const count = await polygonSDK.blockchain.getTransactionsCount(address)
  console.log(`Transactions count for ${address} is ${count}`)

  // Estimate transaction fees
  // https://apidoc.tatum.io/tag/Blockchain-fees#operation/PolygonEstimateGas
  const { gasLimit, gasPrice } = await polygonSDK.blockchain.estimateGas({
    from: address,
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    amount: '1',
  })
  console.log(`Transaction fee: gasLimit: ${gasLimit}, gasPrice: ${gasPrice}`)

  // Get transactions by address
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGetTransactionByAddress
  const accountTransactions = await polygonSDK.blockchain.getAccountTransactions(address, 10)
  console.log(`Transactions for ${address} are ${JSON.stringify(accountTransactions)}`)
}
