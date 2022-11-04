import { TatumDogeSDK } from '@tatumio/doge'

const dogeSDK = TatumDogeSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function dogeBlockchainExample() {
  // Get blockchain info
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGetBlockChainInfo
  const blockchainInfo = await dogeSDK.blockchain.info()

  // Get transaction details by hash
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGetRawTransaction
  const transaction = await dogeSDK.blockchain.getTransaction(
    'afa40aecdf278222eade805c3fbe6360e40217dd5283404a0c648f83b181ff1a',
  )

  // Get block by hash
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGetBlock
  const blockByHash = await dogeSDK.blockchain.getBlock(
    '3df1f2f1cbfd9a3a47b5febcecb6ca0159be6c62a48d642fa40fc9bc0704af34',
  )
  const blockByNumber = await dogeSDK.blockchain.getBlock('4082862')

  // Get block hash by number
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGetBlock
  const hash = await dogeSDK.blockchain.getBlockHash(4082862)

  // Get utxo information
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGetUTXO
  const utxo = await dogeSDK.blockchain.getUTXO(
    '838af2711e974c1fd02b26bb1185fe891fc70f1292dd708d79080f98c6efd293',
    0,
  )

  // Get mempool transactions
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGetMempool
  const mempoolTransactionIds = await dogeSDK.blockchain.mempool()

  // Broadcast tx data
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeBroadcast
  const brodcastedTxHash = await dogeSDK.blockchain.broadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
  })
}
