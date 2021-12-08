// @ts-ignore
import { fromBase58, fromSeed } from 'bip32'
import { mnemonicToSeed } from 'bip39'
import { payments } from 'bitcoinjs-lib'
import { LTC_DERIVATION_PATH, LTC_NETWORK, LTC_TEST_NETWORK } from '../constants'
import { TESTNET_DERIVATION_PATH } from '@tatumio/tatum-core'

/**
 * Generate Litecoin address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateAddress = (testnet: boolean, xpub: string, i: number) => {
  const network = testnet ? LTC_TEST_NETWORK : LTC_NETWORK
  const w = fromBase58(xpub, network).derivePath(String(i))
  return payments.p2pkh({ pubkey: w.publicKey, network }).address as string
}

/**
 * Generate Litecoin private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generatePrivateKey = async (testnet: boolean, mnemonic: string, i: number) => {
  const network = testnet ? LTC_TEST_NETWORK : LTC_NETWORK
  return fromSeed(await mnemonicToSeed(mnemonic), network)
    .derivePath(testnet ? TESTNET_DERIVATION_PATH : LTC_DERIVATION_PATH)
    .derive(i)
    .toWIF()
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
