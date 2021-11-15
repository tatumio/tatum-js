import { Currency, TESTNET_DERIVATION_PATH } from '@tatumio/tatum-core'
import { mnemonicToSeed } from 'bip39'
import { hdkey as ethHdKey } from 'ethereumjs-wallet'
// @ts-ignore
import { VET_DERIVATION_PATH } from '../constants'

/**
 * Generate VeChain address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateVetAddress = (xpub: string, i: number) => {
  const w = ethHdKey.fromExtendedKey(xpub)
  const wallet = w.deriveChild(i).getWallet()
  return '0x' + wallet.getAddress().toString('hex').toLowerCase()
}

/**
 * Generate VeChain private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateVetPrivateKey = async (testnet: boolean, mnemonic: string, i: number): Promise<string> => {
  const path = testnet ? TESTNET_DERIVATION_PATH : VET_DERIVATION_PATH
  const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnemonic))
  const derivePath = hdwallet.derivePath(path).deriveChild(i)
  return derivePath.getWallet().getPrivateKeyString()
}

/**
 * Generate address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
export const generateAddressFromXPub = (xpub: string, i: number) => {
  return generateVetAddress(xpub, i)
}

/**
 * Generate private key from mnemonic seed
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
export const generatePrivateKeyFromMnemonic = (currency: Currency, testnet: boolean, mnemonic: string, i: number) => {
  return generateVetPrivateKey(testnet, mnemonic, i)
}
