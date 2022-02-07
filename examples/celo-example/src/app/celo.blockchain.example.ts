import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumCeloSDK } from '@tatumio/celo'

const celoSDK = TatumCeloSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function celoBlockchainExample() {
  const broadcastHash = await celoSDK.blockchain.broadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })
  const transaction = await celoSDK.blockchain.get(
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )
  const transactions = await celoSDK.blockchain.getAccountTransactions(
    '0x8ce4e40889a13971681391aad29e88efaf91f784',
    10,
  )
  const balance = await celoSDK.blockchain.getBlockchainAccountBalance(
    '0x8ce4e40889a13971681391aad29e88efaf91f784',
  )
  const block = await celoSDK.blockchain.getBlock(
    '0x305c58c8c62399097f1ea702e337f13be6b3a3ed28867d530d8a03191f040b9c',
  )
  const currentBlock = await celoSDK.blockchain.getCurrentBlock()
  const transactionsCount = await celoSDK.blockchain.getTransactionsCount(
    '0x8ce4e40889a13971681391aad29e88efaf91f784',
  )
}
