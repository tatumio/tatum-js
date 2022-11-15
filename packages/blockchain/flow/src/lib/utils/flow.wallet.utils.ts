import { fromBase58, fromSeed } from 'bip32'
import * as elliptic from 'elliptic'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import hdkey from 'hdkey'
import { DERIVATION_PATH } from '@tatumio/shared-core'

export const flowWalletUtils = {
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
      .derive(i).privateKey
    if (!key) throw new Error('No key generated')
    return new elliptic.ec('secp256k1').keyFromPrivate(key).getPrivate().toString(16)
  },
}
