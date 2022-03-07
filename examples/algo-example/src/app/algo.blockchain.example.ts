import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumAlgoSDK } from '@tatumio/algo'

const algoSDK = TatumAlgoSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function algoBlockchainExample() {
  const block = await algoSDK.blockchain.getBlock(16775567)
  const currentBlock = await algoSDK.blockchain.getCurrentBlock()
  const txHash = await algoSDK.blockchain.broadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })
  const balance = await algoSDK.blockchain.getBlockchainAccountBalance(
    'TMETT6BXL3QUH7AH5TS6IONU7LVTLKIGG54CFCNPMQXWGRIZFIESZBYWP4',
  )
  const tx = await algoSDK.blockchain.getTransaction('LXEBXIBDAIF72NRI76SU252QSOGFCKEHTG7AI4P6W25V35PETU3Q')
  const txByAddress = await algoSDK.blockchain.getPayTransactionByFromTo(
    '2021-05-01T20:44:39Z',
    '2021-06-01T20:44:39Z',
  )
}
