import { TatumSolanaSDK } from '@tatumio/solana'

const solanaSDK = TatumSolanaSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * https://apidoc.tatum.io/tag/Solana
 */
export async function solanaBlockchainExample() {
  // Get current block
  // https://apidoc.tatum.io/tag/Solana#operation/SolanaGetCurrentBlock
  const currentBlock = await solanaSDK.blockchain.getCurrentBlock()
  console.log(`Current block: ${currentBlock}`)

  // Get block by number
  // https://apidoc.tatum.io/tag/Solana#operation/SolanaGetBlock
  const block = await solanaSDK.blockchain.getBlock(currentBlock)
  console.log(block)

  // Get transaction details by hash
  // https://apidoc.tatum.io/tag/Solana#operation/SolanaGetTransaction
  const transaction = await solanaSDK.blockchain.getTransaction(
    '43o9jQFYPCHhJdeqcky7HGAWLgubnywFbv74EEjA2gQS9ojEsmje3YHp1ZfCNEZC4CaRAPNaxH7URGuGGpRujPuS',
  )
  console.log(transaction)
}
