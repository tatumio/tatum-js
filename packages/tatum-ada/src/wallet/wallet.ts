import { generateMnemonic } from 'bip39'
import { WalletWithMnemonic } from '@tatumio/tatum-core'
import * as cardano from './cardano.crypto'

/**
 * Generate ADA wallet
 * @param mnemonic mnemonic seed to use
 * @returns wallet
 */
export const generateBlockchainWallet = async (mnemonic: string): Promise<WalletWithMnemonic> => {
  return { mnemonic, xpub: await cardano.generateXPublicKey(mnemonic) }
}

/**
 * Generate wallet
 * @param mnemonic optional mnemonic seed to use. If not present, new one will be generated
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = (mnemonic?: string) => {
  mnemonic ||= generateMnemonic(256)
  return generateBlockchainWallet(mnemonic)
}