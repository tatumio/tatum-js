import { HarmonyAddress } from '@harmony-js/crypto'
import { TESTNET_DERIVATION_PATH } from '@tatumio/tatum-core'
import { mnemonicToSeed } from 'bip39'
import ethWallet, { hdkey as ethHdKey } from 'ethereumjs-wallet'
// @ts-ignore
import { ONE_DERIVATION_PATH } from '../constants'

/**
 * Generate ONE address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateAddress = (xpub: string, i: number) => {
  const w = ethHdKey.fromExtendedKey(xpub)
  const wallet = w.deriveChild(i).getWallet()
  const harmonyAddress = new HarmonyAddress('0x' + wallet.getAddress().toString('hex'))
  return harmonyAddress.basicHex
}

/**
 * Generate Harmony or any other ERC20 private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generatePrivateKey = async (testnet: boolean, mnemonic: string, i: number): Promise<string> => {
  const path = testnet ? TESTNET_DERIVATION_PATH : ONE_DERIVATION_PATH
  const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnemonic))
  const derivePath = hdwallet.derivePath(path).deriveChild(i)
  return derivePath.getWallet().getPrivateKeyString()
}

/**
 * Convert Harmony Private Key to Address
 * @param privKey private key to use
 * @returns blockchain address
 */
const convertPrivateKey = (privKey: string) => {
  const wallet = ethWallet.fromPrivateKey(Buffer.from(privKey.replace('0x', ''), 'hex'))
  return wallet.getAddressString() as string
}

/**
 * Generate address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
export const generateAddressFromXPub = (xpub: string, i: number) => {
  return generateAddress(xpub, i)
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
 * @param privateKey private key to use
 * @returns blockchain private key to the address
 */
export const generateAddressFromPrivatekey = (privateKey: string) => {
  return convertPrivateKey(privateKey)
}
