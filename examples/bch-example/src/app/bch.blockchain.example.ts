import { TatumBchSDK } from '@tatumio/bch'

export async function bchBlockchainExample() {
  const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Get Bitcoin Cash blockchain information such as the version of the testnet or mainnet and the current number of the block and its hash.
  // https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGetBlockChainInfo
  const blockChainInfo = await bchSDK.blockchain.info()
  console.log('Blockchain info: ', blockChainInfo)

  // Get a Bitcoin Cash block by its hash or height.
  // https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGetBlock
  const block = await bchSDK.blockchain.getBlock(
    '0000000000000010da4dbada5440ec86dd74d0ade1920ac1897f9adcfe83f8b9',
  )
  console.log('Block details: ', block)

  // Get the hash of a Bitcoin Cash block.
  // https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGetBlockHash
  const hash = await bchSDK.blockchain.getBlockHash(1525101)
  console.log('Hash', hash)

  // Get information about a specific transaction.
  // https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGetRawTransaction
  const tx = await bchSDK.blockchain.getTransaction(
    '9ce64a7e8ce7d80cc2b18769fc25a619084dae889843fdfca44dfc7c28b7465f',
  )
  console.log('Transaction: ', tx)

  // Get transactions for a specific blockchain address.
  // https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGetTxByAddress
  const txByAddress = await bchSDK.blockchain.getTxForAccount(
    'bchtest:qr5rrwc8nw59awgpxaemwq37arzg9f303u9fp2ws65',
  )
  console.log('Transaction (by address): ', txByAddress)
}
