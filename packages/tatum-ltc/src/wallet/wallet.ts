import { TESTNET_DERIVATION_PATH } from '@tatumio/tatum-core'
import { WalletWithMnemonic } from '@tatumio/tatum-ledger'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
// @ts-ignore
import hdkey from 'hdkey'
import { LTC_DERIVATION_PATH, LTC_NETWORK, LTC_TEST_NETWORK } from '../constants'

/**
 * Generate Litecoin wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
export const generateLtcWallet = async (testnet: boolean, mnem: string): Promise<WalletWithMnemonic> => {
  const hdwallet = hdkey.fromMasterSeed(await mnemonicToSeed(mnem), testnet ? LTC_TEST_NETWORK.bip32 : LTC_NETWORK.bip32)
  return {
    mnemonic: mnem,
    xpub: hdwallet.derive(testnet ? TESTNET_DERIVATION_PATH : LTC_DERIVATION_PATH).toJSON().xpub,
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
  return generateLtcWallet(options.testnet as boolean, mnem)
}
