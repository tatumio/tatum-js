import { fromPublicKey, fromSeed } from 'bip32'
import { mnemonicToSeed } from 'bip39'
import { Currency } from '@tatumio/tatum-core'
import { generateAddress } from './tron.crypto'
import { TRON_DERIVATION_PATH } from '../constants'

const TronWeb = require('tronweb')

/**
 * Generate Tron address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateTronAddress = (xpub: string, i: number) => {
  const w = fromPublicKey(Buffer.from(xpub.slice(0, 66), 'hex'), Buffer.from(xpub.slice(-64), 'hex'))
  return TronWeb.address.fromHex(generateAddress(w.derive(i).publicKey))
}

/**
 * Generate Tron private key from mnemonic seed
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateTronPrivateKey = async (mnemonic: string, i: number) => {
  return (
    fromSeed(await mnemonicToSeed(mnemonic))
      .derivePath(TRON_DERIVATION_PATH)
      .derive(i)
      .privateKey?.toString('hex') ?? ''
  )
}

/**
 * Generate address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
export const generateAddressFromXPub = (xpub: string, i: number) => {
  return generateTronAddress(xpub, i)
}

/**
 * Generate private key from mnemonic seed
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
export const generatePrivateKeyFromMnemonic = (mnemonic: string, i: number) => {
  return generateTronPrivateKey(mnemonic, i)
}

/**
 * Generate address from private key
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param privateKey private key to use
 * @returns blockchain private key to the address
 */
export const generateAddressFromPrivatekey = (currency: Currency, testnet: boolean, privateKey: string) => {
  return TronWeb.address.fromPrivateKey(privateKey)
}
