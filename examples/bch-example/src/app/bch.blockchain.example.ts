import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumBchSDK } from '@tatumio/bch'
import { BchTransaction } from '@tatumio/api-client'

const bchSDK = TatumBchSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bchBlockchainExample() {
  const blockChainInfo = await bchSDK.blockchain.info()
  const block = await bchSDK.blockchain.getBlock(
    '0000000000000010da4dbada5440ec86dd74d0ade1920ac1897f9adcfe83f8b9',
  )
  const txHash = await bchSDK.blockchain.broadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })
  const hash = await bchSDK.blockchain.getBlockHash(1580117)
  const tx = await bchSDK.blockchain.getTransaction(
    '1451692ebbfbea1a2d2ec6fe6782596b6aa2e46c0589d04c406f491b5b46bc6a',
  )
  const txByAddress = await bchSDK.blockchain.getTxForAccount('2MsM67NLa71fHvTUBqNENW15P68nHB2vVXb', 50)
  const transfer = await bchSDK.blockchain.send({
    fromUTXO: [
      {
        txHash: '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
        index: 0,
        privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
      },
    ],
    to: [
      {
        address: '2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7',
        value: 0.02969944,
      },
    ],
    fee: '0.001',
    changeAddress: '2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc3lo6',
  } as BchTransaction)
}
