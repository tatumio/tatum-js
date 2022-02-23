import { generateMnemonic } from 'bip39'
import {
  bech32,
  derivePrivate,
  derivePublic,
  getPubKeyBlake2b224Hash,
  mnemonicToRootKeypair,
  packBaseAddress,
  // ignore for missing types
  // @ts-ignore
} from 'cardano-crypto.js'
import { DERIVATION_PATH } from '@tatumio/shared-core'

const HARDENED_THRESHOLD = 0x80000000
const ADA_DERIVATION_SCHEME = 2

const xpub2blake2b224Hash = (xpub: string) => {
  return getPubKeyBlake2b224Hash(Buffer.from(xpub, 'hex').slice(0, 32))
}

const generateKey = async (mnemonic: string): Promise<Buffer> => {
  const walletSecret = await mnemonicToRootKeypair(mnemonic, ADA_DERIVATION_SCHEME)
  return DERIVATION_PATH['CARDANO']
    .split('/')
    .slice(1)
    .map((index) =>
      index.slice(-1) === "'" ? HARDENED_THRESHOLD + parseInt(index.slice(0, -1)) : parseInt(index),
    )
    .reduce((secret, index) => derivePrivate(secret, index, ADA_DERIVATION_SCHEME), walletSecret)
}

const generatePrivateKey = async (mnemonic: string, i: number): Promise<string> => {
  return derivePrivate(
    derivePrivate(await generateKey(mnemonic), 0, ADA_DERIVATION_SCHEME),
    i,
    ADA_DERIVATION_SCHEME,
  ).toString('hex')
}

const generateXPublicKey = async (mnemonic: string): Promise<string> => {
  const root = await generateKey(mnemonic)
  const spendXPub = derivePrivate(root, 0, ADA_DERIVATION_SCHEME).slice(64, 128).toString('hex')
  const stakeXPub = derivePrivate(derivePrivate(root, 2, ADA_DERIVATION_SCHEME), 0, ADA_DERIVATION_SCHEME)
    .slice(64, 128)
    .toString('hex')
  return spendXPub + stakeXPub
}

const generateAddress = async (xpub: string, i: number, testnet?: boolean): Promise<string> => {
  const spendXPub = derivePublic(Buffer.from(xpub.substr(0, 128), 'hex'), i, ADA_DERIVATION_SCHEME)
  const stakeXPub = xpub.substr(128, 128)
  return bech32.encode(
    testnet ? 'addr_test' : 'addr',
    packBaseAddress(xpub2blake2b224Hash(spendXPub), xpub2blake2b224Hash(stakeXPub), testnet ? 0 : 1),
  )
}

export const adaWallet = () => {
  return {
    /**
     * Generate address
     * @param testnet testnet or mainnet version of address
     * @param xpub extended public key to generate address from
     * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
     * @returns blockchain address
     */
    generateAddressFromXPub: (xpub: string, i: number, testnet?: boolean) => {
      return generateAddress(xpub, i, testnet)
    },
    /**
     * Generate private key from mnemonic seed
     * @param mnemonic mnemonic to generate private key from
     * @param i derivation index of private key to generate.
     * @returns blockchain private key to the address
     */
    generatePrivateKeyFromMnemonic: (mnemonic: string, i: number) => {
      return generatePrivateKey(mnemonic, i)
    },
    /**
     * Generate ADA wallet
     * @param mnemonic mnemonic seed to use
     * @returns wallet
     */
    generateBlockchainWallet: async (mnemonic: string): Promise<{ mnemonic: string; xpub: string }> => {
      return { mnemonic, xpub: await generateXPublicKey(mnemonic) }
    },

    /**
     * Generate wallet
     * @param mnemonic optional mnemonic seed to use. If not present, new one will be generated
     * @returns wallet or a combination of address and private key
     */
    generateWallet: (mnemonic?: string) => {
      mnemonic ||= generateMnemonic(256)
      return adaWallet().generateBlockchainWallet(mnemonic)
    },
  }
}
