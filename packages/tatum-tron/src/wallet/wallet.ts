import { WalletWithMnemonic } from '@tatumio/tatum-core'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { bip32 } from 'bitcoinjs-lib'
import { TRON_DERIVATION_PATH } from '../constants'

/**
 * Generate Tron wallet
 * @returns mnemonic for the wallet
 */
export const generateBlockchainWallet = async (mnem: string): Promise<WalletWithMnemonic> => {
  const w = bip32.fromSeed(await mnemonicToSeed(mnem))
  const bip32Interface = w.derivePath(TRON_DERIVATION_PATH)
  return {
    mnemonic: mnem,
    xpub: bip32Interface.publicKey.toString('hex') + bip32Interface.chainCode.toString('hex'),
  }
}

/**
 * Generate wallet
 * @param mnemonic optional mnemonic seed to use. If not present, new one will be generated
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = (mnemonic?: string): Promise<WalletWithMnemonic> => {
  mnemonic ||= generateMnemonic(256)
  return generateBlockchainWallet(mnemonic)
}
