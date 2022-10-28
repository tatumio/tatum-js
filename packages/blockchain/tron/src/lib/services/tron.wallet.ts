import { TronWallet } from '@tatumio/api-client'
import { Blockchain, DERIVATION_PATH } from '@tatumio/shared-core'
import { BIP32Interface, fromBase58, fromPublicKey, fromSeed } from 'bip32'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { generateAddress, isBase58 } from './tron.utils'

// tronweb lib dont have any typings (not even in @types)
// @ts-ignore
import TronWeb from 'tronweb'
import { tronCustodial } from './tron.custodial'
import { ITronWeb } from './tron.web'
import { tronGasPump } from './tron.gasPump'
import { isHex } from 'web3-utils'

const generateBlockchainWallet = async (mnem: string): Promise<TronWallet> => {
  const w = fromSeed(await mnemonicToSeed(mnem))
  const bip32Interface = w.derivePath(DERIVATION_PATH[Blockchain.TRON]).neutered()

  return {
    mnemonic: mnem,
    xpub: bip32Interface.toBase58(),
  }
}

export const tronWallet = (args: { tronWeb: ITronWeb }) => {
  return {
    /**
     * Generate Tron wallet
     * @returns mnemonic for the wallet
     */
    generateBlockchainWallet,
    /**
     * Generate wallet
     * @param mnemonic optional mnemonic seed to use. If not present, new one will be generated
     * @returns wallet or a combination of address and private key
     */
    async generateWallet(mnemonic?: string): Promise<TronWallet> {
      return generateBlockchainWallet(mnemonic ?? generateMnemonic(256))
    },
    /**
     * Generate address
     * @param xpub extended public key to generate address from
     * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
     * @returns blockchain address
     */
    generateAddressFromXPub(xpub: string, i: number): string {
      let w: BIP32Interface
      if (xpub.length === 130 && isHex(xpub)) {
        w = fromPublicKey(Buffer.from(xpub.slice(0, 66), 'hex'), Buffer.from(xpub.slice(-64), 'hex'))
      } else if (xpub.length === 111 && isBase58(xpub)) {
        w = fromBase58(xpub)
      } else {
        throw new Error('Unknown xpub format')
      }
      return TronWeb.address.fromHex(generateAddress(w.derive(i).publicKey))
    },
    /**
     * Generate private key from mnemonic seed
     * @param mnemonic mnemonic to generate private key from
     * @param i derivation index of private key to generate.
     * @returns blockchain private key to the address
     */
    async generatePrivateKeyFromMnemonic(mnemonic: string, i: number): Promise<string> {
      return (
        fromSeed(await mnemonicToSeed(mnemonic))
          .derivePath(DERIVATION_PATH[Blockchain.TRON])
          .derive(i)
          .privateKey?.toString('hex') ?? ''
      )
    },
    /**
     * Generate address from private key
     * @param privateKey private key to use
     * @returns blockchain private key to the address
     */
    generateAddressFromPrivatekey(privateKey: string): string {
      return TronWeb.address.fromPrivateKey(privateKey)
    },
    custodial: tronCustodial(args),
    gasPump: tronGasPump(args),
  }
}
