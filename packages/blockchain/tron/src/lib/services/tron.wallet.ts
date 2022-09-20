import { TronWallet } from '@tatumio/api-client'
import { Blockchain, DERIVATION_PATH } from '@tatumio/shared-core'
import { fromPublicKey, fromSeed } from 'bip32'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { generateAddress } from './tron.utils'

// tronweb lib dont have any typings (not even in @types)
// @ts-ignore
import TronWeb from 'tronweb'
import { tronCustodial } from './tron.custodial'
import { ITronWeb } from './tron.web'
import { tronGasPump } from './tron.gasPump'

const generateBlockchainWallet = async (mnem: string): Promise<TronWallet> => {
  const w = fromSeed(await mnemonicToSeed(mnem))
  const bip32Interface = w.derivePath(DERIVATION_PATH[Blockchain.TRON])

  return {
    mnemonic: mnem,
    xpub: bip32Interface.publicKey.toString('hex') + bip32Interface.chainCode.toString('hex'),
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
      const w = fromPublicKey(Buffer.from(xpub.slice(0, 66), 'hex'), Buffer.from(xpub.slice(-64), 'hex'))
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
