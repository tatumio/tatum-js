import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumLtcSDK } from '@tatumio/ltc'
import { LtcTransactionAddress } from '@tatumio/api-client'

const ltcSDK = TatumLtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ltcBlockchainExample() {
  const mempoolTransactionIds = await ltcSDK.blockchain.mempool()
  const block = await ltcSDK.blockchain.getBlock(
    '444a4fdf21b3f12370982a4f00c3e311e9d2844d1b2306f00d5514829821e494',
  )
  const txHash = await ltcSDK.blockchain.broadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })
  const balance = await ltcSDK.blockchain.getBlockchainAccountBalance('2MsM67NLa71fHvTUBqNENW15P68nHB2vVXb')
  const blockchainInfo = await ltcSDK.blockchain.info()
  const hash = await ltcSDK.blockchain.getBlockHash(1580117)
  const tx = await ltcSDK.blockchain.getTransaction(
    '1451692ebbfbea1a2d2ec6fe6782596b6aa2e46c0589d04c406f491b5b46bc6a',
  )
  const txByAddress = await ltcSDK.blockchain.getTxForAccount('2MsM67NLa71fHvTUBqNENW15P68nHB2vVXb', 50)
  const utxo = await ltcSDK.blockchain.getUTXO(
    '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
    0,
  )
  const transfer = await ltcSDK.blockchain.send({
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
  } as LtcTransactionAddress)
}
