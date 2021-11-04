import { fromBase58, fromSeed } from 'bip32'
import { mnemonicToSeed } from 'bip39'
import { payments } from 'bitcoinjs-lib'
// @ts-ignore
import { DOGE_DERIVATION_PATH, DOGE_NETWORK, DOGE_TEST_NETWORK, TESTNET_DERIVATION_PATH } from '../constants'
import { Currency } from '@tatumio/tatum-core'

/**
 * Generate Dogecoin address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateDogeAddress = (testnet: boolean, xpub: string, i: number) => {
  const network = testnet ? DOGE_TEST_NETWORK : DOGE_NETWORK
  const w = fromBase58(xpub, network).derivePath(String(i))
  return payments.p2pkh({ pubkey: w.publicKey, network }).address as string
}

/**
 * Generate Dogecoin private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateDogePrivateKey = async (testnet: boolean, mnemonic: string, i: number) => {
  const network = testnet ? DOGE_TEST_NETWORK : DOGE_NETWORK
  return fromSeed(await mnemonicToSeed(mnemonic), network)
    .derivePath(testnet ? TESTNET_DERIVATION_PATH : DOGE_DERIVATION_PATH)
    .derive(i)
    .toWIF()
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
  return generateDogeAddress(testnet, xpub, i)
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
  return generateDogePrivateKey(testnet, mnemonic, i)
}
