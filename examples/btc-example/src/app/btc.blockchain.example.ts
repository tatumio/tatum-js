import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumBtcSDK } from '@tatumio/btc'
import { BtcTransactionFromAddress } from '@tatumio/api-client'

const btcSDK = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function btcBlockchainExample() {
  const mempoolTransactionIds = await btcSDK.blockchain.mempool
  const block = await btcSDK.blockchain.getBlock(
    '0000000000000000000067de34da54c96ff76e6ba172f82c4ed8a25afb112a9e',
  )
  const txHash = await btcSDK.blockchain.broadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })
  const balance = await btcSDK.blockchain.getBlockchainAccountBalance('2MsM67NLa71fHvTUBqNENW15P68nHB2vVXb')
  const blockchainInfo = await btcSDK.blockchain.info()
  const hash = await btcSDK.blockchain.getBlockHash(1580117)
  const tx = await btcSDK.blockchain.getTransaction(
    '1451692ebbfbea1a2d2ec6fe6782596b6aa2e46c0589d04c406f491b5b46bc6a',
  )
  const txByAddress = await btcSDK.blockchain.getTransactionsByAddress(
    '2MsM67NLa71fHvTUBqNENW15P68nHB2vVXb',
    50,
  )
  const utxo = await btcSDK.blockchain.getUTXO(
    '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
    0,
  )
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
  } as BtcTransactionFromAddress)
}
