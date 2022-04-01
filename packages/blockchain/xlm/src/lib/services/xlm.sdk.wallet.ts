import { XlmWallet } from '@tatumio/api-client'
import { SdkWithXrpLikeWalletFunction } from '@tatumio/shared-blockchain-abstract'
import { Keypair } from 'stellar-sdk'

export const xlmWallet = (): SdkWithXrpLikeWalletFunction => {
  return {
    wallet(): XlmWallet {
      const key = Keypair.random()
      return { address: key.publicKey(), secret: key.secret() }
    },
  }
}
