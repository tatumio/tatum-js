import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumEgldSDK } from '@tatumio/egld'

const egldSDK = TatumEgldSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function egldBlockchainExample() {
  const txHash = await egldSDK.blockchain.broadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  const txCount = egldSDK.blockchain.getTransactionsCount(
    'erd17k95m339aqzxzyvjjjfa3lka0yyeqgcsda50tw5z9g73ycfe2caq9e6jq7',
  )

  const currentBlock = await egldSDK.blockchain.getCurrentBlock()

  const egldBlock = await egldSDK.blockchain.getBlock(
    'a6f2ac15a6b1bafdde9afff2297cef49c4c523c516f8ee12fed54be070e9512b',
  )

  const { balance } = await egldSDK.blockchain.getBlockchainAccountBalance(
    'erd17k95m339aqzxzyvjjjfa3lka0yyeqgcsda50tw5z9g73ycfe2caq9e6jq7',
  )

  const erc20Balance = await egldSDK.blockchain.getAccountErc20Balance(
    'erd17k95m339aqzxzyvjjjfa3lka0yyeqgcsda50tw5z9g73ycfe2caq9e6jq7',
    '132',
  )

  const egldTx = await egldSDK.blockchain.getTransaction(
    '99996224823736c1e9b8484ed74c1573049478f871d6f94b86811fb1c7b2addd',
  )

  const gas = await egldSDK.blockchain.estimateGas({
    gasPrice: 10,
    gasLimit: 10,
    chainID: 'D',
    nonce: 1,
    value: '11',
    receiver: 'erd1cux02zersde0l7hhklzhywcxk4u9n4py5tdxyx7vrvhnza2r4gmq4vw35r',
    sender: 'erd1njqj2zggfup4nl83x0nfgqjkjserm7mjyxdx5vzkm8k0gkh40ezqtfz9lg',
    version: 1,
  })
}
