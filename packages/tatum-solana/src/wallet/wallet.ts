import * as solana from '@solana/web3.js'
import { WalletWithAddress } from '@tatumio/tatum-ledger'

/**
 * Generate Solana wallet
 * @param privateKey key to generate address from
 * @returns address and privateKey
 */
export const generateBlockchainWallet = async (privateKey?: string): Promise<WalletWithAddress> => {
  const pair = privateKey ? solana.Keypair.fromSecretKey(Buffer.from(privateKey, 'hex')) : solana.Keypair.generate()
  return {
    address: pair.publicKey.toBase58(),
    privateKey: Buffer.from(pair.secretKey).toString('hex'),
  }
}

/**
 * Generate wallet
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = () => {
  return generateBlockchainWallet()
}
