import { Keypair } from 'stellar-sdk'
import { WalletWithAddress } from '@tatumio/tatum-defi'

/**
 * Generate Stellar address and secret.
 * @param secret secret of the account to generate address
 */
export const generateXlmWallet = async (secret?: string): Promise<WalletWithAddress> => {
  const keypair = secret ? Keypair.fromSecret(secret) : Keypair.random()
  return { address: keypair.publicKey(), privateKey: keypair.secret() }
}

/**
 * Generate wallet
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = () => {
  return generateXlmWallet()
}
