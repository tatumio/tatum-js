import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumAdaSDK } from '@tatumio/ada'

const adaSDK = TatumAdaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function adaBlockchainExample() {
  const block = await adaSDK.blockchain.getBlock(
    '0000000000000010da4dbada5440ec86dd74d0ade1920ac1897f9adcfe83f8b9',
  )
  const txHash = await adaSDK.blockchain.broadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })
  const tx = await adaSDK.blockchain.getTransaction(
    '1451692ebbfbea1a2d2ec6fe6782596b6aa2e46c0589d04c406f491b5b46bc6a',
  )
  const account = await adaSDK.blockchain.getAccount(
    'Ae2tdPwUPEZMmrkRoduJW9w7wRvnTcdeMbw7yyyjwPqo6zuaeJaDEkHUJSz',
  )

  const blockchainInfo = await adaSDK.blockchain.getBlockChainInfo()

  const txByAddress = await adaSDK.blockchain.getTransactionByAddress(
    'Ae2tdPwUPEZMmrkRoduJW9w7wRvnTcdeMbw7yyyjwPqo6zuaeJaDEkHUJSz',
    10,
  )

  const utxos = await adaSDK.blockchain.getUTXOs(
    'Ae2tdPwUPEZMmrkRoduJW9w7wRvnTcdeMbw7yyyjwPqo6zuaeJaDEkHUJSz',
  )
}
