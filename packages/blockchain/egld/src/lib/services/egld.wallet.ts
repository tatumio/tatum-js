import { ApiServices, Wallet } from '@tatumio/api-client'
import { generateMnemonic } from 'bip39'

export const egldWallet = () => {
  return {
    /**
     * Generate EGLD wallet
     * @param mnem mnemonic seed to use
     * @returns wallet
     */
    generateBlockchainWallet: async (mnem: string): Promise<Wallet> => {
      return {
        mnemonic: mnem,
        xpub: '',
      }
    },
    /**
     * Generate wallet
     * @param mnemonic optional mnemonic seed to use. If not present, new one will be generated
     * @returns wallet or a combination of address and private key
     */
    generateWallet: (mnemonic?: string) => {
      mnemonic ||= generateMnemonic(256)
      return ApiServices.blockchain.elgo.egldGenerateWallet(mnemonic)
    },
  }
}
