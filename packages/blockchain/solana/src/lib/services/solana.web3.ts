import { Connection, Keypair } from '@solana/web3.js'
import { TATUM_API_CONSTANTS } from '@tatumio/api-client'
// @ts-ignore
import { decode } from 'base-58'

export interface SolanaWeb3 {
  getClient(provider?: string): Connection

  generateKeyPair(privateKey: string | undefined): Keypair
}

export const solanaWeb3 = (provider?: string) => {
  return {
    getClient(): Connection {
      const url =
        provider ||
        `${process.env['TATUM_API_URL'] || TATUM_API_CONSTANTS.URL}/v3/solana/web3/${
          TATUM_API_CONSTANTS.API_KEY
        }`
      return new Connection(url, 'confirmed')
    },
    generateKeyPair(privateKey: string): Keypair {
      return Keypair.fromSecretKey(
        privateKey.length === 128 ? Buffer.from(privateKey, 'hex') : decode(privateKey),
      )
    },
  }
}
