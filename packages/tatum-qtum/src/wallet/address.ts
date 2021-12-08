import { fromBase58, fromSeed } from 'bip32'
import { mnemonicToSeed } from 'bip39'
import { ECPair, payments } from 'bitcoinjs-lib'
import { QTUM_DERIVATION_PATH, QTUM_NETWORK_MAINNET, QTUM_NETWORK_TESTNET } from '../constants'
import { TESTNET_DERIVATION_PATH } from '@tatumio/tatum-core'

/**
 * Generate QTUM address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateAddress = (testnet: boolean, xpub: string, i: number) => {
  const network = testnet ? QTUM_NETWORK_TESTNET : QTUM_NETWORK_MAINNET
  const w = fromBase58(xpub, network).derivePath(String(i))
  return payments.p2pkh({ pubkey: w.publicKey, network }).address as string
}

/**
 * Generate QTUM private key from mnemonic seed
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generatePrivateKey = async (testnet: boolean, mnem: string, i: number) => {
  const network = testnet ? QTUM_NETWORK_TESTNET : QTUM_NETWORK_MAINNET
  return fromSeed(await mnemonicToSeed(mnem), network)
    .derivePath(testnet ? TESTNET_DERIVATION_PATH : QTUM_DERIVATION_PATH)
    .derive(i)
    .toWIF()
}

/**
 * Generate QTUM private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const convertPrivateKey = (testnet: boolean, privkey: string) => {
  const network = testnet ? QTUM_NETWORK_TESTNET : QTUM_NETWORK_MAINNET
  const keyPair = ECPair.fromWIF(privkey, network)
  return payments.p2pkh({ pubkey: keyPair.publicKey, network }).address as string
}

/**
 * Generate address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
export const generateAddressFromXPub = (testnet: boolean, xpub: string, i: number) => {
  return generateAddress(testnet, xpub, i)
}

/**
 * Generate private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
export const generatePrivateKeyFromMnemonic = (testnet: boolean, mnemonic: string, i: number) => {
  return generatePrivateKey(testnet, mnemonic, i)
}

/**
 * Generate address from private key
 * @param testnet testnet or mainnet version of address
 * @param privateKey private key to use
 * @returns blockchain private key to the address
 */
export const generateAddressFromPrivatekey = (testnet: boolean, privateKey: string) => {
  return convertPrivateKey(testnet, privateKey)
}
