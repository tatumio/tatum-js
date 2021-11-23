import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { networks } from 'bitcoinjs-lib'
// @ts-ignore
import hdkey from 'hdkey'
import { TESTNET_DERIVATION_PATH } from '@tatumio/tatum-core'
import { WalletWithMnemonic } from '@tatumio/tatum-ledger'
import { BTC_DERIVATION_PATH } from '../constants'

/**
 * Generate Bitcoin wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
export const generateBtcWallet = async (testnet: boolean, mnem: string): Promise<WalletWithMnemonic> => {
  const hdwallet = hdkey.fromMasterSeed(await mnemonicToSeed(mnem), testnet ? networks.testnet.bip32 : networks.bitcoin.bip32)
  return {
    mnemonic: mnem,
    xpub: hdwallet.derive(testnet ? TESTNET_DERIVATION_PATH : BTC_DERIVATION_PATH).toJSON().xpub,
  }
}

/**
 * Generate wallet
 * @param options.testnet testnet or mainnet version of address
 * @param options.mnemonic mnemonic seed to use. If not present, new one will be generated
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = (options: { testnet?: boolean; mnemonic?: string }) => {
  const mnemonic = options.mnemonic
  const mnem = mnemonic ? mnemonic : generateMnemonic(256)
  return generateBtcWallet(options.testnet as boolean, mnem)
}
