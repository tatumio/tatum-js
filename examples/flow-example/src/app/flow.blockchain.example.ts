import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumFlowSDK } from '@tatumio/flow'

const flowSDK = TatumFlowSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export const flowBlockchainExample = async () => {
  // Get block detail
  const block = await flowSDK.blockchain.getBlock('1234314')

  // Get Flow current block number
  const currentBlock = await flowSDK.blockchain.getCurrentBlock()

  // Get account info
  const account = await flowSDK.blockchain.getAccount('0x955cd3f17b2fd8ad')

  // Get Flow Transaction by hash
  const transactions = await flowSDK.blockchain.getTransaction(
    'd60631d8e5c8b6eb0557b5181cf28564d771c628a08abc414e87ad7c05ff2fc2',
  )
}
