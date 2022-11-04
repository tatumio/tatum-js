import { TatumBtcSDK } from '@tatumio/btc'

export async function btcBlockchainExample() {
  const btcSDK = TatumBtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const REPLACE_ME_WITH_PRIVATE_KEY = ''

  // Get BTC Blockchain Information. Obtain basic info like testnet / mainnet version of the chain, current block number and it's hash.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetBlockChainInfo
  const blockchainInfo = await btcSDK.blockchain.info()
  console.log(`Blockchain info: ${JSON.stringify(blockchainInfo)}`)

  // Get BTC Block detail by block hash or height.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetBlock
  const block = await btcSDK.blockchain.getBlock(
    '1b3538b601c5e9a5210df8355277c874afa4cec0e66f33789bad8471dce779d9',
  )
  console.log(`Block: ${JSON.stringify(block)}`)

  // Get BTC block hash. Returns hash of the block to get the block detail.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetBlockHash
  const hash = await btcSDK.blockchain.getBlockHash(2583134)
  console.log(`Block hash: ${JSON.stringify(hash)}`)

  // Get BTC transaction by its hash. Returns the transaction detail.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetRawTransaction
  const transaction = await btcSDK.blockchain.getTransaction(
    '4bf8135258bc96ef240078add0cbfdeebde9b5e60b9019dcfe4c413354bbca27',
  )
  console.log(`Transaction: ${JSON.stringify(transaction)}`)

  // Get BTC transaction in mempool. Returns the list of transaction ids.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetMempool
  const mempool = await btcSDK.blockchain.mempool()
  console.log(`Mempool: ${JSON.stringify(mempool)}`)

  // Get BTC transactions by address. Returns a list of transactions assigned to an address.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetTxByAddress
  const txByAddress = await btcSDK.blockchain.getTransactionsByAddress(
    '2MsM67NLa71fHvTUBqNENW15P68nHB2vVXb',
    50,
  )
  console.log(`TX By Address: ${JSON.stringify(txByAddress)}`)

  // Get BTC account balance. Returns incoming and outgoing balance of an BTC address.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetBalanceOfAddress
  const balance = await btcSDK.blockchain.getBlockchainAccountBalance('2MsM67NLa71fHvTUBqNENW15P68nHB2vVXb')
  console.log(`Account balance: ${JSON.stringify(balance)}`)

  // Get information about UTXO in a BTC transaction.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetUTXO
  const utxo = await btcSDK.blockchain.getUTXO(
    '4bf8135258bc96ef240078add0cbfdeebde9b5e60b9019dcfe4c413354bbca27',
    0,
  )
  console.log(`UTXO: ${JSON.stringify(utxo)}`)
}
