import { XlmWallet } from '@tatumio/api-client'
import { SdkWithXrpLikeWalletFunction } from '@tatumio/shared-blockchain-abstract'
import { Keypair } from 'stellar-sdk'

export const xlmWallet = (): SdkWithXrpLikeWalletFunction => {
  return {
    wallet(): XlmWallet {
      const key = Keypair.random()
      return { address: key.publicKey(), secret: key.secret() }
    },
    isValidAddress(address: string): boolean {
      try {
        return Keypair.fromPublicKey(address).publicKey() === address
      } catch {
        return false
      }
    },
    isValidSecret(secret: string): boolean {
      try {
        return Keypair.fromSecret(secret).secret() === secret
      } catch {
        return false
      }
    },
  }
}
