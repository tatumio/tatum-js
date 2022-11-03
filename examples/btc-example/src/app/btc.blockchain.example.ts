import { TatumBtcSDK } from '@tatumio/btc'
import { BtcTransactionFromAddress } from '@tatumio/api-client'

export async function btcBlockchainExample() {
  const btcSDK = TatumBtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Get transactions from the Bitcoin mempool
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetMempool
  const mempoolTransactionIds = await btcSDK.blockchain.mempool()
  console.log(mempoolTransactionIds)

  // Get a Bitcoin block by its hash or height
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetBlock
  const block = await btcSDK.blockchain.getBlock(
    '0000000000000000000067de34da54c96ff76e6ba172f82c4ed8a25afb112a9e',
  )
  console.log(block)

  // Get the balance of a Bitcoin address
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetBalanceOfAddress
  const balance = await btcSDK.blockchain.getBlockchainAccountBalance('2MsM67NLa71fHvTUBqNENW15P68nHB2vVXb')
  console.log(balance)

  // Get Bitcoin blockchain information
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetBlockChainInfo
  const blockchainInfo = await btcSDK.blockchain.info()
  console.log(blockchainInfo)

  // Get the hash of a Bitcoin block
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetBlockHash
  const hash = await btcSDK.blockchain.getBlockHash(1580117)
  console.log(hash)

  // Get a Bitcoin transaction by its hash
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetRawTransaction
  const tx = await btcSDK.blockchain.getTransaction(
    '1451692ebbfbea1a2d2ec6fe6782596b6aa2e46c0589d04c406f491b5b46bc6a',
  )
  console.log(tx)

  // Get all transactions for a Bitcoin address
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetTxByAddress
  const txByAddress = await btcSDK.blockchain.getTransactionsByAddress(
    '2MsM67NLa71fHvTUBqNENW15P68nHB2vVXb',
    50,
  )
  console.log(txByAddress)

  // Get information about a transaction output (UTXO) in a Bitcoin transaction
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGetUTXO
  const utxo = await btcSDK.blockchain.getUTXO(
    '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
    0,
  )
  console.log(utxo)

  // Send BTC to Bitcoin addresses
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcTransferBlockchain
  const transfer = await btcSDK.blockchain.sendTransaction({
    fromAddress: [
      {
        address: '2N9bBiH2qrTDrPCzrNhaFGdkNKS86PJAAAS',
        privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbP',
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
  } as BtcTransactionFromAddress)
  console.log(transfer)
}
