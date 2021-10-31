import { Currency } from '@tatumio/tatum-core'
import { fromSeed } from 'bip32'
import { mnemonicToSeed } from 'bip39'
import { networks } from 'bitcoinjs-lib'
// @ts-ignore
import { BCH_DERIVATION_PATH } from '../constants'

// tslint:disable:no-var-requires
const bcash = require('@tatumio/bitcoincashjs2-lib')
const cashaddr = require('cashaddrjs')
const coininfo = require('coininfo')

interface Hash {
  hash: Buffer
}

interface Bytes extends Hash {
  version: number
}

interface Decoded extends Hash {
  prefix: string
  type: string
  format: string
}

/**
 * Generate Bitcoin Cash address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateBchAddress = (testnet: boolean, xpub: string, i: number) => {
  const network = testnet ? networks.testnet : networks.bitcoin
  const hdNode = bcash.HDNode.fromBase58(xpub, network)
  const legacy = hdNode.derivePath(String(i)).getAddress()

  const decoded: Decoded = _decode(legacy)

  return cashaddr.encode(decoded.prefix, decoded.type, decoded.hash)
}

/**
 * Generate Bitcoin Cash private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateBchPrivateKey = async (testnet: boolean, mnemonic: string, i: number) => {
  const network = testnet ? networks.testnet : networks.bitcoin
  return fromSeed(await mnemonicToSeed(mnemonic), network)
    .derivePath(BCH_DERIVATION_PATH)
    .derive(i)
    .toWIF()
}

export const toLegacyAddress = (address: string) => {
  const { prefix, type, hash }: Decoded = _decode(address)
  let bitcoincash = coininfo.bitcoincash.main
  switch (prefix) {
    case 'bitcoincash':
      bitcoincash = coininfo.bitcoincash.main
      break
    case 'bchtest':
      bitcoincash = coininfo.bitcoincash.test
      break
  }

  let version: number = bitcoincash.versions.public
  switch (type) {
    case 'P2PKH':
      version = bitcoincash.versions.public
      break
    case 'P2SH':
      version = bitcoincash.versions.scripthash
      break
  }

  const hashBuf: Buffer = Buffer.from(hash)

  return bcash.address.toBase58Check(hashBuf, version)
}

const _decode = (address: string): Decoded => {
  const { version, hash }: Bytes = bcash.address.fromBase58Check(address)

  let decoded: Decoded = {
    prefix: '',
    type: '',
    hash,
    format: '',
  }
  switch (version) {
    case networks.bitcoin.pubKeyHash:
      decoded = {
        prefix: 'bitcoincash',
        type: 'P2PKH',
        hash,
        format: 'legacy',
      }
      break
    case networks.bitcoin.scriptHash:
      decoded = {
        prefix: 'bitcoincash',
        type: 'P2SH',
        hash,
        format: 'legacy',
      }
      break
    case networks.testnet.pubKeyHash:
      decoded = {
        prefix: 'bchtest',
        type: 'P2PKH',
        hash,
        format: 'legacy',
      }
      break
    case networks.testnet.scriptHash:
      decoded = {
        prefix: 'bchtest',
        type: 'P2SH',
        hash,
        format: 'legacy',
      }
      break
  }
  return decoded
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
  return generateBchAddress(testnet, xpub, i)
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
  return generateBchPrivateKey(testnet, mnemonic, i)
}
