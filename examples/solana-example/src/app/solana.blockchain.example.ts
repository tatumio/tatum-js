import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumSolanaSDK } from '@tatumio/solana'

const solanaSDK = TatumSolanaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function solanaBlockchainExample() {
  const transaction = await solanaSDK.blockchain.getTransaction(
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )

  const balance = await solanaSDK.blockchain.getAccountBalance('0x8ce4e40889a13971681391aad29e88efaf91f784')
  const block = await solanaSDK.blockchain.getBlock(6470657)

  const currentBlock = await solanaSDK.blockchain.getCurrentBlock()
}
