import { generateMnemonic } from 'bip39'
import { Currency, WalletWithMnemonic } from '@tatumio/tatum-core'
import cardano from './cardano.crypto'

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
 * @param currency blockchain to generate wallet for
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic seed to use. If not present, new one will be generated
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = (currency: Currency, testnet: boolean, mnemonic?: string) => {
  const mnem = mnemonic ? mnemonic : generateMnemonic(256)
  return generateAdaWallet(mnem)
}
