import { generateAddress, generatePrivateKey, generateXPublicKey } from './ada.crypto'
import { generateMnemonic } from 'bip39'

export const adaWallet = () => {
  return {
    /**
     * Generate address
     * @param testnet testnet or mainnet version of address
     * @param xpub extended public key to generate address from
     * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
     * @returns blockchain address
     */
    generateAddressFromXPub: (xpub: string, i: number, testnet?: boolean) => {
      return generateAddress(xpub, i, testnet)
    },
    /**
     * Generate private key from mnemonic seed
     * @param mnemonic mnemonic to generate private key from
     * @param i derivation index of private key to generate.
     * @returns blockchain private key to the address
     */
    generatePrivateKeyFromMnemonic: (mnemonic: string, i: number) => {
      return generatePrivateKey(mnemonic, i)
    },
    /**
     * Generate ADA wallet
     * @param mnemonic mnemonic seed to use
     * @returns wallet
     */
    generateBlockchainWallet: async (mnemonic: string): Promise<{ mnemonic: string; xpub: string }> => {
      return { mnemonic, xpub: await generateXPublicKey(mnemonic) }
    },

    /**
     * Generate wallet
     * @param mnemonic optional mnemonic seed to use. If not present, new one will be generated
     * @returns wallet or a combination of address and private key
     */
    generateWallet: (mnemonic?: string) => {
      mnemonic ||= generateMnemonic(256)
      return adaWallet().generateBlockchainWallet(mnemonic)
    },
  }
}
