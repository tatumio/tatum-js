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
    '00000000000000c97a747dec7d222fa7a79c1b404f9eacd69671316872e02e9e',
  )
  console.log(`Block: ${JSON.stringify(block)}`)

  // Get BTC block hash. Returns hash of the block to get the block detail.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetBlockHash
  const hash = await btcSDK.blockchain.getBlockHash(2404196)
  console.log(`Block hash: ${JSON.stringify(hash)}`)

  // Get BTC transaction by its hash. Returns the transaction detail.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetRawTransaction
  const transaction = await btcSDK.blockchain.getTransaction(
    '293ab7fd4f6516333c4af7eb8944674220b70f7cb8239998109ed313606617f4',
  )
  console.log(`Transaction: ${JSON.stringify(transaction)}`)

  // Get BTC transaction in mempool. Returns the list of transaction ids.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetMempool
  const mempool = await btcSDK.blockchain.mempool()
  console.log(`Mempool: ${JSON.stringify(mempool)}`)

  // Get BTC transactions by address. Returns a list of transactions assigned to an address.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetTxByAddress
  const txByAddress = await btcSDK.blockchain.getTransactionsByAddress(
    'tb1qs37qvm6n405r592kswuugpf0jg3ypzarutfwk9',
    50,
  )
  console.log(`TX By Address: ${JSON.stringify(txByAddress)}`)

  // Get BTC account balance. Returns incoming and outgoing balance of an BTC address.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetBalanceOfAddress
  const balance = await btcSDK.blockchain.getBlockchainAccountBalance(
    'tb1qs37qvm6n405r592kswuugpf0jg3ypzarutfwk9',
  )
  console.log(`Account balance: ${JSON.stringify(balance)}`)

  // Get information about UTXO in a BTC transaction.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetUTXO
  const utxo = await btcSDK.blockchain.getUTXO(
    '5a54cb3c7841bccbb4fb1f6e9ee4d097f3798602a2caa6f8289c669a8ba1cdbc',
    1,
  )
  console.log(`UTXO: ${JSON.stringify(utxo)}`)
}
