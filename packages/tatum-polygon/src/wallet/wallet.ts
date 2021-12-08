import { WalletWithMnemonic } from '@tatumio/tatum-ledger'
import { TESTNET_DERIVATION_PATH } from '@tatumio/tatum-core'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { hdkey as ethHdKey } from 'ethereumjs-wallet'
import { MATIC_DERIVATION_PATH } from '../constants'

/**
 * Generate Polygon or any other ERC20 wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
export const generateBlockchainWallet = async (testnet: boolean, mnem: string): Promise<WalletWithMnemonic> => {
  const path = testnet ? TESTNET_DERIVATION_PATH : MATIC_DERIVATION_PATH
  const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnem))
  const derivePath = hdwallet.derivePath(path)
  return {
    xpub: derivePath.publicExtendedKey().toString(),
    mnemonic: mnem,
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
  return generateBlockchainWallet(!!options?.testnet, mnemonic)
}
