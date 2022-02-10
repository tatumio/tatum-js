import { TatumSolanaSDK } from '@tatumio/solana'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const solanaSDK = TatumSolanaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function solanaApiExample() {
  const web3 = await solanaSDK.api.solanaWeb3Driver('asdlkfjnqunalkwjfnq2oi303294857k', {
    jsonrpc: '2.0',
    method: 'web3_clientVersion',
    params: [],
    id: 2,
  })

  const transferHash = await solanaSDK.api.solanaBlockchainTransfer({
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    amount: '0.01',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a785',
    from: '0x8ce4e40889a13971681391aad29e88efaf91f784',
  })

  const wallet = await solanaSDK.api.solanaGenerateWallet()

  const block = await solanaSDK.api.solanaGetBlock(6470657)

  const currentBlock = await solanaSDK.api.solanaGetCurrentBlock()

  const balance = await solanaSDK.api.solanaGetBalance('0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B')

  const transaction = await solanaSDK.api.solanaGetTransaction(
    '0xcf2c40f475e78c7c19778e1ae999a0e371c9319b38182ea15dc94536f13f9137',
  )
}
