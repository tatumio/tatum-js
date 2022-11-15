import { flowWalletUtils } from '../utils/flow.wallet.utils'

export const flowWallet = () => {
  return {
    generateAddressFromXPub: (xpub: string, i: number): string => {
      return flowWalletUtils.generateAddressFromXPub(xpub, i)
    },
    generateAddressFromPrivateKey: (privateKey: string): string => {
      return flowWalletUtils.generateAddressFromPrivateKey(privateKey)
    },
    generateWallet: async (mnemonic?: string) => {
      return flowWalletUtils.generateWallet(mnemonic)
    },
    generatePrivateKeyFromMnemonic: async (mnemonic: string, i: number) => {
      return flowWalletUtils.generatePrivateKeyFromMnemonic(mnemonic, i)
    },
  }
}
