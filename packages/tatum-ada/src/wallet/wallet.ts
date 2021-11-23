import { generateMnemonic } from 'bip39'
import { WalletWithMnemonic } from '@tatumio/tatum-ledger'
import * as cardano from './cardano.crypto'

/**
 * Generate ADA wallet
 * @param mnemonic mnemonic seed to use
 * @returns wallet
 */
export const generateAdaWallet = async (mnemonic: string): Promise<WalletWithMnemonic> => {
  return { mnemonic, xpub: await cardano.generateXPublicKey(mnemonic) }
}

/**
 * Generate wallet
 * @param options.mnemonic mnemonic seed to use. If not present, new one will be generated
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = (options: { mnemonic?: string }) => {
  const mnemonic = options?.mnemonic
  const mnem = mnemonic ? mnemonic : generateMnemonic(256)
  return generateAdaWallet(mnem)
}
