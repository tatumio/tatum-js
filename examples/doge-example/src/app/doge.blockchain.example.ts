import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumDogeSDK } from '@tatumio/doge'
import { DogeTransactionUTXO } from '@tatumio/api-client'

const dogeSDK = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function dogeBlockchainExample() {
  const mempoolTransactionIds = await dogeSDK.blockchain.mempool()
  const block = await dogeSDK.blockchain.getBlock(
    '2b5ff9b07eb150b12d0724b7fd4e4a1c0be61f674f8ba82798456d2c3c045717',
  )
  const txHash = await dogeSDK.blockchain.broadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })
  const blockchainInfo = await dogeSDK.blockchain.info()
  const hash = await dogeSDK.blockchain.getBlockHash(1580117)
  const tx = await dogeSDK.blockchain.getTransaction(
    '1451692ebbfbea1a2d2ec6fe6782596b6aa2e46c0589d04c406f491b5b46bc6a',
  )
  const utxo = await dogeSDK.blockchain.getUTXO(
    '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
    0,
  )
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
  } as DogeTransactionUTXO)
}
