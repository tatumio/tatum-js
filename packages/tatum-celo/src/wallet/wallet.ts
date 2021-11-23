import { TESTNET_DERIVATION_PATH } from '@tatumio/tatum-core'
import { WalletWithMnemonic } from '@tatumio/tatum-ledger'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { hdkey as ethHdKey } from 'ethereumjs-wallet'
import { CELO_DERIVATION_PATH } from '../constants'

/**
 * Generate Celo or any other ERC20 wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
export const generateCeloWallet = async (testnet: boolean, mnem: string): Promise<WalletWithMnemonic> => {
  const path = testnet ? TESTNET_DERIVATION_PATH : CELO_DERIVATION_PATH
  const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnem))
  const derivePath = hdwallet.derivePath(path)
  return {
    xpub: derivePath.publicExtendedKey().toString(),
    mnemonic: mnem,
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
  return generateCeloWallet(options.testnet as boolean, mnem)
}
