import { TatumBchSDK } from '@tatumio/bch'
import { BchTransaction } from '@tatumio/api-client'

export async function bchBlockchainExample() {
  const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Get Bitcoin Cash Blockchain Information. Obtain basic info like testnet / mainnet version of the chain, current block number and it's hash.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGetBlockChainInfo
  const blockChainInfo = await bchSDK.blockchain.info()
  console.log(blockChainInfo)

  // Get Bitcoin Cash Block detail by block hash or height.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGetBlock
  const block = await bchSDK.blockchain.getBlock(
    '0000000000000010da4dbada5440ec86dd74d0ade1920ac1897f9adcfe83f8b9',
  )
  console.log(block)

  // Get Bitcoin Cash Block hash. Returns hash of the block to get the block detail.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGetBlockHash
  const hash = await bchSDK.blockchain.getBlockHash(1525101)
  console.log(hash)

  // Get Bitcoin Cash Transaction by transaction hash.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGetRawTransaction
  const tx = await bchSDK.blockchain.getTransaction(
    '30956fb1c4a9e45996a22e2b98c31baffd75f896c53c2945302e85801d4cf889',
  )
  console.log(tx)

  // Get Bitcoin Cash Transactions by address
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGetTxByAddress
  const txByAddress = await bchSDK.blockchain.getTxForAccount(
    'bchtest:qr5rrwc8nw59awgpxaemwq37arzg9f303u9fp2ws65',
    50,
  )
  console.log(txByAddress)

  // Send BCH to blockchain addresses.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchTransferBlockchain
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
  console.log(transfer)
}
