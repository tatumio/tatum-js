import * as bech32 from 'bech32'
import { mnemonicToSeed } from 'bip39'
import { derivePath, getPublicKey } from 'ed25519-hd-key'
import { EGLD_DERIVATION_PATH } from '../constants'
import { Currency, TESTNET_DERIVATION_PATH } from '@tatumio/tatum-core'

/**
 * Generate EGLD address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
export const generateEgldAddress = async (testnet: boolean, mnem: string, i: number): Promise<string> => {
  const path = (testnet ? TESTNET_DERIVATION_PATH + "'" : EGLD_DERIVATION_PATH) + `/${i}'`
  const seed = await mnemonicToSeed(mnem)
  const { key } = derivePath(path, seed.toString('hex'))
  const words = bech32.toWords(getPublicKey(key, false))
  const address = bech32.encode('erd', words)
  return address
}

/**
 * Generate EGLD private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateEgldPrivateKey = async (testnet: boolean, mnemonic: string, i: number): Promise<string> => {
  const path = (testnet ? TESTNET_DERIVATION_PATH + "'" : EGLD_DERIVATION_PATH) + `/${i}'`
  const seed = await mnemonicToSeed(mnemonic)
  const { key } = derivePath(path, seed.toString('hex'))
  return key.toString('hex')
}

/**
 * Convert EGLD Private Key to Address
 * @param privKey private key to use
 * @returns blockchain address
 */
const convertEgldPrivateKey = (privKey: string) => {
  const publicKey = getPublicKey(Buffer.from(privKey, 'hex'), false).toString('hex')
  const words = bech32.toWords(Buffer.from(publicKey.slice(-64), 'hex'))
  const address = bech32.encode('erd', words)
  return address
}

/**
 * Generate address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
export const generateAddressFromXPub = (testnet: boolean, xpub: string, i: number) => {
  return generateEgldAddress(testnet, xpub, i)
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
  return generateEgldPrivateKey(testnet, mnemonic, i)
}

/**
 * Generate address from private key
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param privateKey private key to use
 * @returns blockchain private key to the address
 */
export const generateAddressFromPrivatekey = (currency: Currency, testnet: boolean, privateKey: string) => {
  return convertEgldPrivateKey(privateKey)
}
