import { TronWallet } from '@tatumio/api-client'
import { Blockchain, DERIVATION_PATH } from '@tatumio/shared-core'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { bip32 } from 'bitcoinjs-lib'

/**
 * Generate Tron wallet
 * @returns mnemonic for the wallet
 */
export const generateBlockchainWallet = async (mnem: string): Promise<TronWallet> => {
  const w = bip32.fromSeed(await mnemonicToSeed(mnem))
  const bip32Interface = w.derivePath(DERIVATION_PATH[Blockchain.TRON])

  return {
    mnemonic: mnem,
    xpub: bip32Interface.publicKey.toString('hex') + bip32Interface.chainCode.toString('hex'),
  }
}

export const tronWallet = () => {
  return {
    /**
     * Generate Tron wallet
     * @returns mnemonic for the wallet
     */
    generateBlockchainWallet,
    /**
     * Generate wallet
     * @param mnemonic optional mnemonic seed to use. If not present, new one will be generated
     * @returns wallet or a combination of address and private key
     */
    async generateWallet(mnemonic?: string): Promise<TronWallet> {
      mnemonic ||= generateMnemonic(256)

      return generateBlockchainWallet(mnemonic)
    },
  }
}
