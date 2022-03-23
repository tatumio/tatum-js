import { TerraWallet, XlmWallet, XrpWallet } from '@tatumio/api-client'
import { SdkWithXrpLikeWalletFunction } from '@tatumio/shared-blockchain-abstract'
import { Keypair } from '@solana/web3.js'
// @ts-ignore
import { decode, encode } from 'base-58'

export const solanaWallet = (): SdkWithXrpLikeWalletFunction => {
  return {
    wallet: (privateKey?: string): XrpWallet | XlmWallet | TerraWallet => {
      let keypair = Keypair.generate()
      if (privateKey) {
        keypair = Keypair.fromSecretKey(
          privateKey.length === 128 ? Buffer.from(privateKey, 'hex') : decode(privateKey),
        )
      }
      return { address: keypair.publicKey.toBase58(), privateKey: encode(keypair.secretKey) }
    },
  }
}
