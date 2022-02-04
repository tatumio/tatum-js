import { DERIVATION_PATH } from '@tatumio/shared-core'
import * as elliptic from 'elliptic'
import { fromBase58, fromSeed } from 'bip32'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import hdkey from 'hdkey'
import { SdkWithWalletFunctions } from '@tatumio/shared-blockchain-abstract'

export const flowWallet = (): SdkWithWalletFunctions => {
  return {
    generateAddressFromXPub: (xpub: string, i: number): string => {
      const w = fromBase58(xpub).derivePath(String(i))
      const s = new elliptic.ec('secp256k1').keyFromPublic(w.publicKey).getPublic().encode('hex', false)
      return s.slice(2)
    },
    generateAddressFromPrivateKey: (privateKey: string): string => {
      const s = new elliptic.ec('secp256k1').keyFromPrivate(privateKey).getPublic().encode('hex', false)
      return s.slice(2)
    },
    generateWallet: async (mnemonic?: string) => {
      mnemonic ||= generateMnemonic(256)
      const hdwallet = hdkey.fromMasterSeed(await mnemonicToSeed(mnemonic))
      return {
        mnemonic,
        xpub: hdwallet.derive(DERIVATION_PATH.FLOW).toJSON().xpub,
      }
    },
    generatePrivateKeyFromMnemonic: async (mnemonic: string, i: number) => {
      const key = fromSeed(await mnemonicToSeed(mnemonic))
        .derivePath(DERIVATION_PATH.FLOW)
        .derive(i).privateKey as Buffer
      return new elliptic.ec('secp256k1').keyFromPrivate(key).getPrivate().toString(16)
    },
  }
}
