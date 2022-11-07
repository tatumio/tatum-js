import { TatumBnbSDK } from '@tatumio/bnb'

const bnbSDK = TatumBnbSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function bnbBlockchainExample() {
  // Get BNB current block number
  // https://apidoc.tatum.io/tag/BNB-Beacon-Chain#operation/BnbGetCurrentBlock
  const currentBlockNumber = await bnbSDK.blockchain.getCurrentBlock()
  console.log(`Current block: ${currentBlockNumber}`)

  // Get block details
  // https://apidoc.tatum.io/tag/BNB-Beacon-Chain#operation/BnbGetBlock
  const block = await bnbSDK.blockchain.getBlock(currentBlockNumber - 1)
  console.log(`Block Details: ${JSON.stringify(block)}`)

  // Get BNB Transaction details by hash
  // https://apidoc.tatum.io/tag/BNB-Beacon-Chain#operation/BnbGetTransaction
  const transaction = await bnbSDK.blockchain.getTransaction(
    '356BEBE84893CD8F3B130B0B2798FA3E3B199344981CF1C776A37D903F1D150F',
  )
  console.log(`Transaction Details: ${JSON.stringify(transaction)}`)
}
