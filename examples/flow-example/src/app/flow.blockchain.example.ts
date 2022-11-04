import { TatumFlowSDK } from '@tatumio/flow'

const flowSDK = TatumFlowSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab', testnet: true })

export const flowBlockchainExample = async () => {
  // Get Flow current block number
  // https://apidoc.tatum.io/tag/Flow#operation/FlowGetBlockChainInfo
  const currentBlockNumber = await flowSDK.blockchain.getCurrentBlock()
  console.log(`Current block: ${currentBlockNumber}`)

  // Get block details
  // https://apidoc.tatum.io/tag/Flow#operation/FlowGetBlock
  const block = await flowSDK.blockchain.getBlock('84488302')
  console.log(`Block Details: ${JSON.stringify(block)}`)

  // Get Flow Transaction details by hash
  // https://apidoc.tatum.io/tag/Flow#operation/FlowGetRawTransaction
  const transaction = await flowSDK.blockchain.getTransaction(
    '89212c5e5d35171385a4e49ec00e1a0b9466ebd31f766ca04f0e7b8bdf9a3691',
  )
  console.log(`Transaction Details: ${JSON.stringify(transaction)}`)

  // Get account info
  // https://apidoc.tatum.io/tag/Flow#operation/FlowGetAccount
  const account = await flowSDK.blockchain.getAccount('0x955cd3f17b2fd8ad')
  console.log(`Account Info: ${JSON.stringify(account)}`)
}
