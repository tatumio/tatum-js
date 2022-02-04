import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumOneSDK } from '@tatumio/one'

const oneSDK = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function oneBlockchainExample() {
  const broadcastHash = await oneSDK.blockchain.broadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })
  const transaction = await oneSDK.blockchain.get(
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )
  const balance = await oneSDK.blockchain.getBlockchainAccountBalance(
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )
  const block = await oneSDK.blockchain.getBlock(
    '0x305c58c8c62399097f1ea702e337f13be6b3a3ed28867d530d8a03191f040b9c',
  )
  const currentBlock = await oneSDK.blockchain.getCurrentBlock()
  const transactionsCount = await oneSDK.blockchain.getTransactionsCount(
    '0xdac17f958d2ee523a2206206994597c13d831ec7',
  )
}
