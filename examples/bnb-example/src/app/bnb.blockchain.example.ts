import { TatumBnbSDK } from '@tatumio/bnb'

export async function bnbBlockchainExample() {
  const bnbSDK = TatumBnbSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  const curBlock = await bnbSDK.blockchain.getCurrentBlock()
  console.log('curBlock: ' + curBlock)

  const transactions = await bnbSDK.blockchain.getBlock(curBlock)
  console.log('block content: ' + JSON.stringify(transactions))

  const tx = await bnbSDK.blockchain.getTransaction(
    '0601AE0E11B65414DCDE47F6C3992B572AB4C7033930A3827A001B8BC1F543A8',
  )
  console.log('tx: ' + JSON.stringify(tx))
}
