import { TatumSolanaSDK } from '@tatumio/solana'

const solanaSDK = TatumSolanaSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * https://apidoc.tatum.io/tag/Solana
 */
export async function solanaBlockchainExample() {
  // https://apidoc.tatum.io/tag/Solana#operation/SolanaGetCurrentBlock
  const currentBlock = await solanaSDK.blockchain.getCurrentBlock()
  console.log(`Current block: ${currentBlock}`)

  // https://apidoc.tatum.io/tag/Solana#operation/SolanaGetBlock
  const block = await solanaSDK.blockchain.getBlock(currentBlock)
  console.log(block)

  // https://apidoc.tatum.io/tag/Solana#operation/SolanaGetTransaction
  const transaction = await solanaSDK.blockchain.getTransaction(
    '5oSXZkPregqGhHrTcbWhgHQJETvBHtBYssuuCMJ3qroAgHsHndsr8fyY8kY76AgwmMaZBZW8ThHAXwjDaUSweApS',
  )
  console.log(transaction)

  // https://apidoc.tatum.io/tag/Solana#operation/SolanaGetBalance
  const { balance } = await solanaSDK.blockchain.getAccountBalance('FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ')
  console.log(`Balance of the account FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ is : ${balance}`)
}
