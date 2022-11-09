import { TatumBchSDK } from '@tatumio/bch'
import { BchTransaction } from '@tatumio/api-client'

export async function bchBlockchainExample() {
  const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Get Bitcoin Cash Blockchain Information. Obtain basic info like testnet / mainnet version of the chain, current block number and it's hash.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGetBlockChainInfo
  const blockChainInfo = await bchSDK.blockchain.info()
  console.log('Blockchain info: ', blockChainInfo)

  // Get Bitcoin Cash Block detail by block hash or height.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGetBlock
  const block = await bchSDK.blockchain.getBlock(
    '0000000000000010da4dbada5440ec86dd74d0ade1920ac1897f9adcfe83f8b9',
  )
  console.log('Block details: ', block)

  // Get Bitcoin Cash Block hash. Returns hash of the block to get the block detail.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGetBlockHash
  const hash = await bchSDK.blockchain.getBlockHash(1525101)
  console.log('Hash', hash)

  // Get Bitcoin Cash Transaction by transaction hash.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGetRawTransaction
  const tx = await bchSDK.blockchain.getTransaction(
    '9ce64a7e8ce7d80cc2b18769fc25a619084dae889843fdfca44dfc7c28b7465f',
  )
  console.log('Transaction: ', tx)

  // Get Bitcoin Cash Transactions by address
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGetTxByAddress
  const txByAddress = await bchSDK.blockchain.getTxForAccount(
    'bchtest:qr5rrwc8nw59awgpxaemwq37arzg9f303u9fp2ws65',
  )
  console.log('Transaction (by address): ', txByAddress)

  // Send BCH to blockchain addresses.
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchTransferBlockchain
  const transfer = await bchSDK.blockchain.send({
    fromUTXO: [
      {
        txHash: 'a400c8882f2032cccb90619d3eabe8bcdb9ed215389f03d7b9760ea8aa6d2ed7',
        index: 0,
        privateKey: 'cU39Ur7xeb2rhty3QxYtuUxZj2UgKCoJtMPEqvLqsY7a4CpTyCU4',
      },
    ],
    to: [
      {
        address: 'bchtest:qr5rrwc8nw59awgpxaemwq37arzg9f303u9fp2ws65',
        value: 0.0001,
      },
    ],
    fee: '0.0001',
    changeAddress: 'bchtest:qzk6zxdyjgma9y2uq5untflqpa6wfpn99gxh5sdrtl',
  } as BchTransaction)
  console.log('Transaction Id: ', transfer)
}
