import { TatumCardanoSDK } from '@tatumio/cardano'

const cardanoSDK = TatumCardanoSDK({ apiKey: '03fea4e2-9c66-453d-b760-e0318182ae74' })

export async function cardanoBlockchainExample() {
  // Get blockchain info
  // https://apidoc.tatum.io/tag/cardanocoin#operation/cardanoGetBlockChainInfo
  const blockchainInfo = await cardanoSDK.blockchain.info()
  console.log('Blockchain info:', blockchainInfo)

  // Get transaction details by hash
  // https://apidoc.tatum.io/tag/cardanocoin#operation/cardanoGetRawTransaction
  const transaction = await cardanoSDK.blockchain.getTransaction(
    '1a80caf9d71a99e1ed6f41faa97e51c8a5635a7df681fc45dabdd1e14c9cbcd8',
  )
  console.log('Transaction info:', transaction)

  // Get block by hash
  // https://apidoc.tatum.io/tag/cardanocoin#operation/cardanoGetBlock
  const blockByHash = await cardanoSDK.blockchain.getBlock(
    '05fe7b57dae87e1e80f007edae20a8665fa533d5f9af7f25731aaf50713b9706',
  )
  console.log('Block by hash:', blockByHash)

  const blockByNumber = await cardanoSDK.blockchain.getBlock('757311')
  console.log('Block by number:', blockByNumber)


  // Get utxo information
  // https://apidoc.tatum.io/tag/Cardano#operation/AdaGetUTXOByAddress
  const utxos = await cardanoSDK.blockchain.getUtxoByAddress('addr_test1qrjqe4n77ptzl3r2d0yd2hh75dq457qwv8a8utm8yx58g4r93yxgvkgvn7vys3kkh99lghwgfrmgltg3y0dxtms3pw4qspvmp4')
  console.log('Utxos:', utxos)

  // Get tx by address
  // https://apidoc.tatum.io/tag/Cardano#operation/AdaGetTxByAddress
  const txs = await cardanoSDK.blockchain.getTxByAddress('addr_test1qrjqe4n77ptzl3r2d0yd2hh75dq457qwv8a8utm8yx58g4r93yxgvkgvn7vys3kkh99lghwgfrmgltg3y0dxtms3pw4qspvmp4', 50)
  console.log('Txs by address:', txs)
}
