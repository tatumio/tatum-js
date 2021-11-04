import { Currency, WalletWithMnemonic } from '@tatumio/tatum-core'
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
 * @param currency blockchain to generate wallet for
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic seed to use. If not present, new one will be generated
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = (currency: Currency, testnet: boolean, mnemonic?: string) => {
  const mnem = mnemonic ? mnemonic : generateMnemonic(256)
  return generateBchWallet(testnet, mnem)
}
