import {
  bech32,
  derivePrivate,
  derivePublic,
  getPubKeyBlake2b224Hash,
  mnemonicToRootKeypair,
  packBaseAddress,
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

export const generatePrivateKey = async (mnemonic: string, i: number): Promise<string> => {
  return derivePrivate(
    derivePrivate(await generateKey(mnemonic), 0, ADA_DERIVATION_SCHEME),
    i,
    ADA_DERIVATION_SCHEME,
  ).toString('hex')
}

export const generateXPublicKey = async (mnemonic: string): Promise<string> => {
  const root = await generateKey(mnemonic)
  const spendXPub = derivePrivate(root, 0, ADA_DERIVATION_SCHEME).slice(64, 128).toString('hex')
  const stakeXPub = derivePrivate(derivePrivate(root, 2, ADA_DERIVATION_SCHEME), 0, ADA_DERIVATION_SCHEME)
    .slice(64, 128)
    .toString('hex')
  return spendXPub + stakeXPub
}

export const generateAddress = async (xpub: string, i: number, testnet?: boolean): Promise<string> => {
  const spendXPub = derivePublic(Buffer.from(xpub.substr(0, 128), 'hex'), i, ADA_DERIVATION_SCHEME)
  const stakeXPub = xpub.substr(128, 128)
  return bech32.encode(
    testnet ? 'addr_test' : 'addr',
    packBaseAddress(xpub2blake2b224Hash(spendXPub), xpub2blake2b224Hash(stakeXPub), testnet ? 0 : 1),
  )
}
