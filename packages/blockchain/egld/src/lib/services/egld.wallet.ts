import * as bech32 from 'bech32'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { derivePath, getPublicKey } from 'ed25519-hd-key'
import { ApiServices, Wallet } from '@tatumio/api-client'
import { COMMON_TESTNET_DERIVATION_PATH, DERIVATION_PATH } from '@tatumio/shared-core'

const generatePrivateKey = async (testnet: boolean, mnemonic: string, i: number): Promise<string> => {
  const path = (testnet ? COMMON_TESTNET_DERIVATION_PATH + "'" : DERIVATION_PATH.EGLD) + `/${i}'`
  const seed = await mnemonicToSeed(mnemonic)
  const { key } = derivePath(path, seed.toString('hex'))
  return key.toString('hex')
}

const convertPrivateKey = (privKey: string) => {
  const publicKey = getPublicKey(Buffer.from(privKey, 'hex'), false).toString('hex')
  const words = bech32.toWords(Buffer.from(publicKey.slice(-64), 'hex'))
  return bech32.encode('erd', words)
}

export const egldWallet = () => {
  return {
    /**
     * Generate EGLD wallet
     * @param mnem mnemonic seed to use
     * @returns wallet
     */
    generateBlockchainWallet: async (mnem: string): Promise<Wallet> => {
      return {
        mnemonic: mnem,
        xpub: '',
      }
    },
    /**
     * Generate wallet
     * @param mnemonic optional mnemonic seed to use. If not present, new one will be generated
     * @returns wallet or a combination of address and private key
     */
    generateWallet: (mnemonic?: string) => {
      mnemonic ||= generateMnemonic(256)
      return ApiServices.blockchain.elgo.egldGenerateWallet(mnemonic)
    },

    /**
     * Generate private key from mnemonic seed
     * @param testnet testnet or mainnet version of address
     * @param mnemonic mnemonic to generate private key from
     * @param i derivation index of private key to generate.
     * @returns blockchain private key to the address
     */
    generatePrivateKeyFromMnemonic: (testnet: boolean, mnemonic: string, i: number) => {
      return generatePrivateKey(testnet, mnemonic, i)
    },

    /**
     * Generate address from mnemonic
     * @param testnet testnet or mainnet version of address
     * @param mnemonic mnemonic to generate address from
     * @param i derivation index of address to generate
     * @returns blockchain address
     */
    generateAddress: async (testnet: boolean, mnemonic: string, i: number) => {
      const privateKey = await generatePrivateKey(testnet, mnemonic, i)
      return convertPrivateKey(privateKey)
    },

    /**
     * Generate address from private key
     * @param privateKey private key to use
     * @returns blockchain address
     */
    generateAddressFromPrivateKey: (privateKey: string): string => {
      return convertPrivateKey(privateKey)
    },

    /**
     * Generate address from mnemonic
     * Note: EGLD does not support xpub, so mnemonic is used instead for API consistency
     * @param mnemonic mnemonic to generate address from
     * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
     * @param testnet testnet or mainnet version of address
     * @returns blockchain address
     */
    generateAddressFromXPub: async (mnemonic: string, i: number, testnet?: boolean): Promise<string> => {
      const path = (testnet ? COMMON_TESTNET_DERIVATION_PATH + "'" : DERIVATION_PATH.EGLD) + `/${i}'`
      const seed = await mnemonicToSeed(mnemonic)
      const { key } = derivePath(path, seed.toString('hex'))
      const publicKey = getPublicKey(key, false).toString('hex')
      const words = bech32.toWords(Buffer.from(publicKey.slice(-64), 'hex'))
      return bech32.encode('erd', words)
    },
  }
}
