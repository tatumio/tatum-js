import { Currency, TESTNET_DERIVATION_PATH } from '@tatumio/tatum-core'
import { mnemonicToSeed } from 'bip39'
import ethWallet, { hdkey as ethHdKey } from 'ethereumjs-wallet'
// @ts-ignore
import { XDC_DERIVATION_PATH } from '../constants'

/**
 * Generate XDC private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateXdcPrivateKey = async (testnet: boolean, mnemonic: string, i: number): Promise<string> => {
  const path = testnet ? TESTNET_DERIVATION_PATH : XDC_DERIVATION_PATH
  const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnemonic))
  const derivePath = hdwallet.derivePath(path).deriveChild(i)
  return derivePath.getWallet().getPrivateKeyString()
}

/**
 * Generate XDC address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateXdcAddress = (testnet: boolean, xpub: string, i: number) => {
  const w = ethHdKey.fromExtendedKey(xpub)
  const wallet = w.deriveChild(i).getWallet()
  return '0x' + wallet.getAddress().toString('hex').toLowerCase()
}

/**
 * Convert XDCress
 * @param testnet testnet or mainnet version of address
 * @param privkey private key to use
 * @returns blockchain address
 */
const convertXdcPrivateKey = (testnet: boolean, privkey: string) => {
  const wallet = ethWallet.fromPrivateKey(Buffer.from(privkey.replace('0x', ''), 'hex'))
  return wallet.getAddressString() as string
}

/**
 * Generate address
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
export const generateAddressFromXPub = (currency: Currency, testnet: boolean, xpub: string, i: number) => {
  return generateXdcAddress(testnet, xpub, i)
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
  return generateXdcPrivateKey(testnet, mnemonic, i)
}

/**
 * Generate address from private key
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param privateKey private key to use
 * @returns blockchain private key to the address
 */
export const generateAddressFromPrivatekey = (currency: Currency, testnet: boolean, privateKey: string) => {
  return convertXdcPrivateKey(testnet, privateKey)
}
