import * as solana from '@solana/web3.js'
import { WalletWithAddress } from '@tatumio/tatum-core'
// @ts-ignore
import { decode, encode } from 'base-58'

/**
 * Generate Solana wallet
 * @param privateKey key to generate address from
 * @returns address and privateKey
 */
export const generateBlockchainWallet = async (privateKey?: string): Promise<WalletWithAddress> => {
  const pair = privateKey
    ? solana.Keypair.fromSecretKey(privateKey.length === 128 ? Buffer.from(privateKey, 'hex') : decode(privateKey))
    : solana.Keypair.generate()
  return {
    address: pair.publicKey.toBase58(),
    privateKey: encode(pair.secretKey),
  }
}

/**
 * Generate wallet
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = () => {
  return generateBlockchainWallet()
}
