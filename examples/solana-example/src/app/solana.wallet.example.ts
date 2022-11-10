import { TatumSolanaSDK } from '@tatumio/solana'

const solanaSDK = TatumSolanaSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function solanaWalletExample() {
  // Generate Solana wallet
  // https://apidoc.tatum.io/tag/Solana#operation/SolanaGenerateWallet
  const { address, privateKey } = solanaSDK.wallet.wallet()
  console.log(`Generated account with: \naddress ${address}\nprivateKey ${privateKey}`)
}
