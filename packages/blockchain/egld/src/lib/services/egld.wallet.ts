import * as bech32 from 'bech32'
import { mnemonicToSeed, generateMnemonic } from 'bip39'
import { derivePath, getPublicKey } from 'ed25519-hd-key'
import { Blockchain, getDerivationPath } from '@tatumio/shared-core'

export const egldWallet = () => {
  return {
    /**
     * Generate wallet
     * @param mnemonic optional mnemonic seed to use. If not present, new one will be generated
     * @returns wallet or a combination of address and private key
     */
    generateWallet: (mnemonic?: string) => {
      mnemonic ||= generateMnemonic(256)
      return generateBlockchainWallet(mnemonic)
    },
    /**
     * Generate address
     * @param xpub extended public key to generate address from
     * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
     * @param options
     * @returns blockchain address
     */
    generateAddressFromXPub: (xpub: string, i: number, options?: { testnet: boolean }) => {
      return generateAddress(xpub, i, options)
    },
    /**
     * Generate private key from mnemonic seed
     * @param mnemonic mnemonic to generate private key from
     * @param i derivation index of private key to generate.
     * @param options
     * @returns blockchain private key to the address
     */
    generatePrivateKeyFromMnemonic: (mnemonic: string, i: number, options?: { testnet: boolean }) => {
      return generatePrivateKey(mnemonic, i, options)
    },
    /**
     * Generate address from private key
     * @param privateKey private key to use
     * @returns blockchain private key to the address
     */
    generateAddressFromPrivateKey: (privateKey: string) => {
      return convertPrivateKey(privateKey)
    },
  }
}

/**
 * Generate EGLD private key from mnemonic seed
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @param options
 * @returns blockchain private key to the address
 */
const generatePrivateKey = async (
  mnemonic: string,
  i: number,
  options?: { testnet: boolean },
): Promise<string> => {
  const path =
    (options.testnet
      ? getDerivationPath(Blockchain.EGLD, options) + "'"
      : getDerivationPath(Blockchain.EGLD)) + `/${i}'`
  const seed = await mnemonicToSeed(mnemonic)
  const { key } = derivePath(path, seed.toString('hex'))
  return key.toString('hex')
}

/**
 * Convert EGLD Private Key to Address
 * @param privKey private key to use
 * @returns blockchain address
 */
const convertPrivateKey = (privKey: string) => {
  const publicKey = getPublicKey(Buffer.from(privKey, 'hex'), false).toString('hex')
  const words = bech32.toWords(Buffer.from(publicKey.slice(-64), 'hex'))
  const address = bech32.encode('erd', words)
  return address
}

const generateAddress = async (mnem: string, i: number, options?: { testnet: boolean }): Promise<string> => {
  const path =
    (options?.testnet
      ? getDerivationPath(Blockchain.EGLD, options) + "'"
      : getDerivationPath(Blockchain.EGLD)) + `/${i}'`
  const seed = await mnemonicToSeed(mnem)
  const { key } = derivePath(path, seed.toString('hex'))
  const words = bech32.toWords(getPublicKey(key, false))
  const address = bech32.encode('erd', words)
  return address
}

/**
 * Generate EGLD wallet
 * @param mnemonic mnemonic seed to use
 * @returns wallet
 */
export const generateBlockchainWallet = (mnemonic: string): { mnemonic: string } => {
  return {
    mnemonic,
  }
}
