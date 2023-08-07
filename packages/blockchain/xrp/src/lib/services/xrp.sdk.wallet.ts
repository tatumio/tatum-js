import { XrpWallet } from '@tatumio/api-client'
import { SdkWithXrpLikeWalletFunction } from '@tatumio/shared-blockchain-abstract'
import { Wallet, isValidAddress, isValidSecret } from 'xrpl'

export const xrpWallet = (): SdkWithXrpLikeWalletFunction => {
  return {
    wallet: (): XrpWallet => {
      const { classicAddress, seed } = Wallet.generate()
      return { address: classicAddress, secret: seed! }
    },
    isValidAddress: (address: string): boolean => {
      return isValidAddress(address)
    },
    isValidSecret: (secret: string): boolean => {
      return isValidSecret(secret)
    },
  }
}
