import { TatumSolanaSDK } from '@tatumio/solana'

const solanaSDK = TatumSolanaSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function solanaBalanceExample(): Promise<void> {
  // Create new blockchain address
  // https://apidoc.tatum.io/tag/Solana#operation/SolanaGenerateWallet
  const { address, privateKey } = solanaSDK.wallet.wallet()
  console.log(`My address is ${address} with private key is ${privateKey}`)

  // Fund the address on https://solfaucet.com/
  // NOTE: Tatum is using Devnet

  // Get balance of SOL
  // https://apidoc.tatum.io/tag/Solana#operation/SolanaGetBalance
  const { balance } = await solanaSDK.blockchain.getAccountBalance(address)
  console.log(`Balance of the account ${address} is : ${balance}`)
}
