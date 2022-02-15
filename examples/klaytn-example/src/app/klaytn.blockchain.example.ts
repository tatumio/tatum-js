import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumKlaytnSDK } from '@tatumio/klaytn'

const klaytnSDK = TatumKlaytnSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function klaytnBlockchainExample() {
  const broadcastHash = await klaytnSDK.blockchain.broadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  const gasInfo = await klaytnSDK.blockchain.estimateGas({
    from: '0xfb99f8ae9b70a0c8cd96ae665bbaf85a7e01a2ef',
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    amount: '100000',
    data: 'My note to recipient.',
  })

  const transaction = await klaytnSDK.blockchain.get(
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )
  const balance = await klaytnSDK.blockchain.getBlockchainAccountBalance(
    '0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B',
  )
  const block = await klaytnSDK.blockchain.getBlock(
    '0x305c58c8c62399097f1ea702e337f13be6b3a3ed28867d530d8a03191f040b9c',
  )
  const currentBlock = await klaytnSDK.blockchain.getCurrentBlock()
  const transactionsCount = await klaytnSDK.blockchain.getTransactionsCount(
    '0xdac17f958d2ee523a2206206994597c13d831ec7',
  )
}
