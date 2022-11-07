import { TatumPolygonSDK } from '@tatumio/polygon'

const polygonSDK = TatumPolygonSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function polygonBlockchainExample() {
  // Get current block
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGetCurrentBlock
  const currentBlock = await polygonSDK.blockchain.getCurrentBlock()
  console.log(`Current block in blockchain is ${currentBlock}.`)

  // Get block by block number
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGetBlock
  const block = await polygonSDK.blockchain.getBlock(
    '0x81cdc6b1ee8534aae34ba134292777f64acf163a6b5f6db35509b7799e4bd660',
  )
  console.log(`Block`, block)

  // Get transaction details by hash
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGetTransaction
  const hash = '0x56c5ea1b1cc9317dc2427b4d373b1a255eb2bad63eab9505a53c4f6d236eba73'
  const transaction = await polygonSDK.blockchain.get(hash)
  console.log('Transaction: ', transaction)

  // Generate wallet
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateWallet
  const { mnemonic, xpub } = await polygonSDK.wallet.generateWallet(undefined, { testnet: true })
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
    to: '0x5f70408c785184fa55bd06a26e25c34574805b36',
    amount: '1',
  })
  console.log(`Transaction fee: gasLimit: ${gasLimit}, gasPrice: ${gasPrice}`)

  // Get transactions by address
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGetTransactionByAddress
  const accountTransactions = await polygonSDK.blockchain.getAccountTransactions(address, 10)
  console.log(`Transactions for ${address} are ${JSON.stringify(accountTransactions)}`)
}
