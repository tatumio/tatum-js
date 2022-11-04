import { TatumLtcSDK } from '@tatumio/ltc'
import { LtcTransactionAddress } from '@tatumio/api-client'

export async function ltcBlockchainExample() {
  const ltcSDK = TatumLtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const REPLACE_ME_WITH_PRIVATE_KEY = ''

  // Get LTC Blockchain Information. Obtain basic info like testnet / mainnet version of the chain, current block number and it's hash.
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcGetBlockChainInfo
  const blockchainInfo = await ltcSDK.blockchain.info()
  console.log(`Blockchain info: ${JSON.stringify(blockchainInfo)}`)

  // Get LTC Block detail by block hash or height.
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcGetBlock
  const block = await ltcSDK.blockchain.getBlock(
    '1b3538b601c5e9a5210df8355277c874afa4cec0e66f33789bad8471dce779d9',
  )
  console.log(`Block: ${JSON.stringify(block)}`)

  // Get LTC block hash. Returns hash of the block to get the block detail.
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcGetBlockHash
  const hash = await ltcSDK.blockchain.getBlockHash(2583134)
  console.log(`Block hash: ${JSON.stringify(hash)}`)

  // Get LTC transaction by its hash. Returns the transaction detail.
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcGetRawTransaction
  const transaction = await ltcSDK.blockchain.getTransaction(
    '4bf8135258bc96ef240078add0cbfdeebde9b5e60b9019dcfe4c413354bbca27',
  )
  console.log(`Transaction: ${JSON.stringify(transaction)}`)

  // Get LTC transaction in mempool. Returns the list of transaction ids.
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcGetMempool
  const mempool = await ltcSDK.blockchain.mempool()
  console.log(`Mempool: ${JSON.stringify(mempool)}`)

  // Get LTC transactions by address. Returns a list of transactions assigned to an address.
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcGetTxByAddress
  const txByAddress = await ltcSDK.blockchain.getTransactionsByAddress(
    '2MsM67NLa71fHvTUBqNENW15P68nHB2vVXb',
    50,
  )
  console.log(`TX By Address: ${JSON.stringify(txByAddress)}`)

  // Get LTC account balance. Returns incoming and outgoing balance of an LTC address.
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcGetBalanceOfAddress
  const balance = await ltcSDK.blockchain.getBlockchainAccountBalance('2MsM67NLa71fHvTUBqNENW15P68nHB2vVXb')
  console.log(`Account balance: ${JSON.stringify(balance)}`)

  // Get information about UTXO in a LTC transaction.
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcGetUTXO
  const utxo = await ltcSDK.blockchain.getUTXO(
    '4bf8135258bc96ef240078add0cbfdeebde9b5e60b9019dcfe4c413354bbca27',
    0,
  )
  console.log(`UTXO: ${JSON.stringify(utxo)}`)
}
