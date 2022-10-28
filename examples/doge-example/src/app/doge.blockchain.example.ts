import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumDogeSDK } from '@tatumio/doge'

const dogeSDK = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function dogeBlockchainExample() {
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
    '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
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

  // Get blockchain info
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGetBlockChainInfo
  const blockchainInfo = await dogeSDK.blockchain.info()

  // Send transaction
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeTransferBlockchain
  const transfer = await dogeSDK.blockchain.sendTransaction({
    fromUTXO: [
      {
        txHash: 'fcdc23f5c8bd811195921cd113f5724f3cf8b3fa0287a04366c51b9e8545c4c7',
        index: 1,
        privateKey: 'QTEcWfGqd2RbCRuAvoXAz99D8RwENfy8j6X92vPnUKR7yL1kXouk',
        address: 'n36h3pAH7sC3z8KMB47BjbqvW2aJd2oTi7',
        value: '60',
      },
    ],
    to: [
      {
        address: '2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7',
        value: 0.02969944,
      },
    ],
    fee: '0.001',
    changeAddress: 'n36h3pAH7sC3z8KMB47BjbqvW2aJd2oTi7',
  })
}
