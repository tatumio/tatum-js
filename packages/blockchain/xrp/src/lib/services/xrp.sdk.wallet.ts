import { XrpWallet } from '@tatumio/api-client'
import { SdkWithXrpLikeWalletFunction } from '@tatumio/shared-blockchain-abstract'
import { RippleAPI } from 'ripple-lib'

export const xrpWallet = (): SdkWithXrpLikeWalletFunction => {
  return {
    wallet: (): XrpWallet => {
      const api = new RippleAPI()
      const { address, secret } = api.generateAddress()
      return { address: address as string, secret }
    },
    isValidAddress: (address: string): boolean => {
      return new RippleAPI().isValidAddress(address)
    },
    isValidSecret: (secret: string): boolean => {
      return new RippleAPI().isValidSecret(secret)
    }
  }
}
