import { WalletWithMnemonic } from '@tatumio/tatum-ledger'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
// @ts-ignore
import hdkey from 'hdkey'
import { LYRA_DERIVATION_PATH, LYRA_NETWORK, LYRA_TEST_NETWORK } from '../constants'

/**
 * Generate Scrypta wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
export const generateLyraWallet = async (testnet: boolean, mnem: string): Promise<WalletWithMnemonic> => {
  const hdwallet = hdkey.fromMasterSeed(await mnemonicToSeed(mnem), testnet ? LYRA_TEST_NETWORK.bip32 : LYRA_NETWORK.bip32)
  return { mnemonic: mnem, xpub: hdwallet.derive(LYRA_DERIVATION_PATH).toJSON().xpub }
}

/**
 * Generate wallet
 * @param mnemonic optional mnemonic seed to use. If not present, new one will be generated
 * @param options.testnet optional testnet or mainnet version of address
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = (mnemonic?: string, options?: { testnet?: boolean }) => {
  mnemonic ||= generateMnemonic(256)
  return generateLyraWallet(!!options?.testnet, mnemonic)
}
