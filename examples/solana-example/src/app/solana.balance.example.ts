import { TatumSolanaSDK } from '@tatumio/solana'

const solanaSDK = TatumSolanaSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * https://apidoc.tatum.io/tag/Solana#operation/SolanaGetBalance
 */
export async function solanaBalanceExample(): Promise<void> {
  // Create new blockchain address
  const { address, privateKey } = solanaSDK.wallet.wallet()
  console.log(`My address is ${address} with private key is ${privateKey}`)

  // Fund the address on https://solfaucet.com/

  // Get balance of SOL
  const balance = await solanaSDK.blockchain.getAccountBalance(address)
  console.log(`Balance of the account ${address} is : ${balance}`)
}
