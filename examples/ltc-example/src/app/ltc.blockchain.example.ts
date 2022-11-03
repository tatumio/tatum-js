import { TatumLtcSDK } from '@tatumio/ltc'
import { LtcTransactionAddress } from '@tatumio/api-client'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

export async function ltcBlockchainExample() {
  const ltcSDK = TatumLtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
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
  const txByAddress = await ltcSDK.blockchain.getTxForAccount('2MsM67NLa71fHvTUBqNENW15P68nHB2vVXb', 50)
  console.log(`TX By Address: ${JSON.stringify(txByAddress)}`)

  // Get LTC account balance. Returns incomign and outgoing balance of an LTC address.
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

  // Broadcast LTC transaction to the blockchain.
  // First we prepare the signed TX data to be used for the broadcast.
  // Account balance is needed for the transfer to work, you can top up your testnet LTC balance with https://testnet-faucet.com/ltc-testnet/
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcBroadcast
  const signedTxData = await ltcSDK.transaction.prepareSignedTransaction(
    {
      fromAddress: [
        {
          address: '2N9bBiH2qrTDrPCzrNhaFGdkNKS86PJAAAS',
          privateKey: REPLACE_ME_WITH_PRIVATE_KEY,
        },
      ],
      to: [
        {
          address: '2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7',
          value: 0.02969944,
        },
      ],
      fee: '0.001',
      changeAddress: '2N9bBiH2qrTDrPCzrNhaFGdkNKS86PJAAAS',
    },
    { testnet: true },
  )
  const broadcastTx = await ltcSDK.blockchain.broadcast({
    txData: signedTxData,
  })
  console.log(`Broadcast TX: ${JSON.stringify(broadcastTx)}`)

  // Send LTC to a blockchain address.
  // Account balance is needed for the transfer to work, you can top up your testnet LTC balance with https://testnet-faucet.com/ltc-testnet/
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcTransferBlockchain
  const transfer = await ltcSDK.blockchain.send({
    fromAddress: [
      {
        address: '2N9bBiH2qrTDrPCzrNhaFGdkNKS86PJAAAS',
        privateKey: REPLACE_ME_WITH_PRIVATE_KEY,
      },
    ],
    to: [
      {
        address: '2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7',
        value: 0.02969944,
      },
    ],
    fee: '0.001',
    changeAddress: '2N9bBiH2qrTDrPCzrNhaFGdkNKS86PJAAAS',
  } as LtcTransactionAddress)
  console.log(`Transfer: ${JSON.stringify(transfer)}`)
}
