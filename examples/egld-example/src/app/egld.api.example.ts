import { TatumEgldSDK } from '@tatumio/egld'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const egldSDK = TatumEgldSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function egldApiExample() {
  const node = await egldSDK.api.egldNodeGet('asdlkfjnqunalkwjf12341kljl')

  const txHash1 = await egldSDK.api.egldBlockchainTransfer({
    from: 'erd17k95m339aqzxzyvjjjfa3lka0yyeqgcsda50tw5z9g73ycfe2caq9e6jq7',
    to: 'erd17k95m339aqzxzyvjjjfa3lka0yyeqgcsda50tw5z9g73ycfe2caq9e6jq6',
    amount: '0',
    fee: {
      gasLimit: '500000',
      gasPrice: '1000000000',
    },
    data: 'Hello world',
    fromPrivateKey: '0cd8e6217b4a218807b858ffb508483cdcdadbb7a21196727f764a510a692760',
  })

  const txHash2 = await egldSDK.api.egldBroadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  const egldBlock = await egldSDK.api.egldGetBlock(
    'a6f2ac15a6b1bafdde9afff2297cef49c4c523c516f8ee12fed54be070e9512b',
  )

  const resource = await egldSDK.api.egldNodePost('asdlkfjnqunalkwjf12341kljl', {
    version: 1,
    chainId: 'D',
    nonce: 42,
    value: '100000000000000000',
    receiver: 'erd1cux02zersde0l7hhklzhywcxk4u9n4py5tdxyx7vrvhnza2r4gmq4vw35r',
    sender: 'erd1njqj2zggfup4nl83x0nfgqjkjserm7mjyxdx5vzkm8k0gkh40ezqtfz9lg',
    gasPrice: 1000000000,
    gasLimit: 70000,
    data: 'food for cats',
    signature:
      '93207c579bf57be03add632b0e1624a73576eeda8a1687e0fa286f03eb1a17ffb125ccdb008a264c402f074a360442c7a034e237679322f62268b614e926d10f',
  })

  const { address } = await egldSDK.api.egldGenerateAddress(
    'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
    1,
  )

  const { key } = await egldSDK.api.egldGenerateAddressPrivateKey({
    index: 1,
    mnemonic:
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
  })

  const { mnemonic } = await egldSDK.api.egldGenerateWallet(
    'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
  )

  const { balance } = await egldSDK.api.egldGetBalance(
    'erd17k95m339aqzxzyvjjjfa3lka0yyeqgcsda50tw5z9g73ycfe2caq9e6jq7',
  )

  const currentBlock = await egldSDK.api.eGldGetCurrentBlock()

  const egldTx = await egldSDK.api.egldGetTransaction(
    '99996224823736c1e9b8484ed74c1573049478f871d6f94b86811fb1c7b2addd',
  )

  const outgoingTransactions = egldSDK.api.egldGetTransactionAddress(
    'erd17k95m339aqzxzyvjjjfa3lka0yyeqgcsda50tw5z9g73ycfe2caq9e6jq7',
  )

  const txCount = egldSDK.api.egldGetTransactionCount(
    'erd17k95m339aqzxzyvjjjfa3lka0yyeqgcsda50tw5z9g73ycfe2caq9e6jq7',
  )
}
