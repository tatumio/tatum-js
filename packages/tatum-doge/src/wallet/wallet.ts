import { generateMnemonic, mnemonicToSeed } from 'bip39'
// @ts-ignore
import hdkey from 'hdkey'
import { DOGE_DERIVATION_PATH, DOGE_NETWORK, DOGE_TEST_NETWORK } from '../constants'
import { Currency, TESTNET_DERIVATION_PATH, WalletWithMnemonic } from '@tatumio/tatum-core'

/**
 * Generate Doge wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
export const generateDogeWallet = async (testnet: boolean, mnem: string): Promise<WalletWithMnemonic> => {
  const hdwallet = hdkey.fromMasterSeed(await mnemonicToSeed(mnem), testnet ? DOGE_TEST_NETWORK.bip32 : DOGE_NETWORK.bip32)
  return {
    mnemonic: mnem,
    xpub: hdwallet.derive(testnet ? TESTNET_DERIVATION_PATH : DOGE_DERIVATION_PATH).toJSON().xpub,
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
  return generateDogeWallet(testnet, mnem)
}
