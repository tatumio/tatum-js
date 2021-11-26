import { WalletWithMnemonic } from '@tatumio/tatum-ledger'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { networks } from 'bitcoinjs-lib'
// @ts-ignore
import hdkey from 'hdkey'
import { BCH_DERIVATION_PATH } from '../constants'

/**
 * Generate Bitcoin Cash wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
export const generateBchWallet = async (testnet: boolean, mnem: string): Promise<WalletWithMnemonic> => {
  const hdwallet = hdkey.fromMasterSeed(await mnemonicToSeed(mnem), testnet ? networks.testnet.bip32 : networks.bitcoin.bip32)
  return {
    mnemonic: mnem,
    xpub: hdwallet.derive(BCH_DERIVATION_PATH).toJSON().xpub,
  }
}

/**
 * Generate wallet
 * @param mnemonic optional mnemonic seed to use. If not present, new one will be generated
 * @param options.testnet optional testnet or mainnet version of address
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = (mnemonic?: string, options?: { testnet?: boolean }) => {
  mnemonic ||= generateMnemonic(256)
  return generateBchWallet(!!options?.testnet, mnemonic)
}
