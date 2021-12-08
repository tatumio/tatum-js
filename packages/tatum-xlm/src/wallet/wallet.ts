import { Keypair } from 'stellar-sdk'
import { WalletWithAddress } from '@tatumio/tatum-ledger'

/**
 * Generate Stellar address and secret.
 * @param secret optional secret of the account to generate address, if not provided, random is generated
 * @returns wallet or a combination of address and private key
 */
export const generateBlockchainWallet = async (secret?: string): Promise<WalletWithAddress> => {
  const keypair = secret ? Keypair.fromSecret(secret) : Keypair.random()
  return { address: keypair.publicKey(), privateKey: keypair.secret() }
}

/**
 * Generate wallet
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = () => {
  return generateBlockchainWallet()
}
