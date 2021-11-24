import { generateMnemonic } from 'bip39'
import { WalletWithMnemonic } from '@tatumio/tatum-ledger'

/**
 * Generate EGLD wallet
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
export const generateEgldWallet = async (mnem: string): Promise<WalletWithMnemonic> => {
  return {
    mnemonic: mnem,
    xpub: '',
  }
}

/**
 * Generate wallet
 * @param mnemonic mnemonic seed to use. If not present, new one will be generated
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = (mnemonic: string) => {
  mnemonic ||= generateMnemonic(256)
  return generateEgldWallet(mnemonic)
}
