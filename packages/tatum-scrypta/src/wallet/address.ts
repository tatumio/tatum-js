import { Currency } from '@tatumio/tatum-core'
import { fromBase58, fromSeed } from 'bip32'
import { mnemonicToSeed } from 'bip39'
import { ECPair, payments } from 'bitcoinjs-lib'
import { LYRA_DERIVATION_PATH, LYRA_NETWORK, LYRA_TEST_NETWORK } from '../constants'

/**
 * Generate Bitcoin address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateLyraAddress = (testnet: boolean, xpub: string, i: number) => {
  const network = testnet ? LYRA_TEST_NETWORK : LYRA_NETWORK
  const w = fromBase58(xpub, network).derivePath(String(i))
  return payments.p2pkh({ pubkey: w.publicKey, network }).address as string
}

/**
 * Generate Scrypta private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateLyraPrivateKey = async (testnet: boolean, mnemonic: string, i: number) => {
  const network = testnet ? LYRA_TEST_NETWORK : LYRA_NETWORK
  return fromSeed(await mnemonicToSeed(mnemonic), network)
    .derivePath(LYRA_DERIVATION_PATH)
    .derive(i)
    .toWIF()
}

/**
 * Convert Scrypta Private Key to Address
 * @param testnet testnet or mainnet version of address
 * @param privkey private key to use
 * @returns blockchain address
 */
const convertLyraPrivateKey = (testnet: boolean, privkey: string) => {
  const network = testnet ? LYRA_TEST_NETWORK : LYRA_NETWORK
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
  return generateLyraAddress(testnet, xpub, i)
}

/**
 * Generate private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
export const generatePrivateKeyFromMnemonic = (testnet: boolean, mnemonic: string, i: number) => {
  return generateLyraPrivateKey(testnet, mnemonic, i)
}

/**
 * Generate address from private key
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param privateKey private key to use
 * @returns blockchain private key to the address
 */
export const generateAddressFromPrivatekey = (currency: Currency, testnet: boolean, privateKey: string) => {
  return convertLyraPrivateKey(testnet, privateKey)
}
