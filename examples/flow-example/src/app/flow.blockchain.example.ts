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

  const { keyId, address } = await flowSDK.blockchain.getSignKey(true)

  const { signature } = await flowSDK.blockchain.signWithKey(
    '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    true,
  )

  const tx = await flowSDK.blockchain.broadcast(
    '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  )
}
