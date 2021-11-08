import { TESTNET_DERIVATION_PATH, Currency, WalletWithMnemonic } from '@tatumio/tatum-core'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { hdkey as ethHdKey } from 'ethereumjs-wallet'
import { ONE_DERIVATION_PATH } from '../constants'

/**
 * Generate Harmony or any other ERC20 wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
export const generateOneWallet = async (testnet: boolean, mnem: string): Promise<WalletWithMnemonic> => {
  const path = testnet ? TESTNET_DERIVATION_PATH : ONE_DERIVATION_PATH
  const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnem))
  const derivePath = hdwallet.derivePath(path)
  return {
    xpub: derivePath.publicExtendedKey().toString(),
    mnemonic: mnem,
  }
}

/**
 * Generate wallet
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic seed to use. If not present, new one will be generated
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = (testnet: boolean, mnemonic?: string) => {
  const mnem = mnemonic ? mnemonic : generateMnemonic(256)
  return generateOneWallet(testnet, mnem)
}
