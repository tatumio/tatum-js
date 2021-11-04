import { fromBase58, fromPublicKey, fromSeed } from 'bip32';
import { mnemonicToSeed } from 'bip39';
import { ECPair, networks, payments } from 'bitcoinjs-lib';
// @ts-ignore
import {
    BTC_DERIVATION_PATH,
    TESTNET_DERIVATION_PATH,
} from '../constants';
import { Currency } from '@tatumio/tatum-core'

const algosdk = require('algosdk');
const base32 = require('base32.js');
const sha512_256 = require('js-sha512').sha512_256;
// tslint:disable:no-var-requires
const bcash = require('@tatumio/bitcoincashjs2-lib');
const cashaddr = require('cashaddrjs');
const coininfo = require('coininfo');
// tslint:disable-next-line:no-var-requires
const TronWeb = require('tronweb');


interface Hash {
    hash: Buffer;
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
 * Generate Bitcoin address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateBtcAddress = (testnet: boolean, xpub: string, i: number) => {
    const network = testnet ? networks.testnet : networks.bitcoin
    const w = fromBase58(xpub, network).derivePath(String(i))
    return payments.p2pkh({ pubkey: w.publicKey, network }).address as string
}

/**
 * Generate Bitcoin private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateBtcPrivateKey = async (testnet: boolean, mnemonic: string, i: number) => {
    const network = testnet ? networks.testnet : networks.bitcoin
    return fromSeed(await mnemonicToSeed(mnemonic), network)
        .derivePath(testnet ? TESTNET_DERIVATION_PATH : BTC_DERIVATION_PATH)
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
        format: ''
    }
    switch (version) {
        case networks.bitcoin.pubKeyHash:
            decoded = {
                prefix: 'bitcoincash',
                type: 'P2PKH',
                hash,
                format: 'legacy'
            }
            break
        case networks.bitcoin.scriptHash:
            decoded = {
                prefix: 'bitcoincash',
                type: 'P2SH',
                hash,
                format: 'legacy'
            }
            break
        case networks.testnet.pubKeyHash:
            decoded = {
                prefix: 'bchtest',
                type: 'P2PKH',
                hash,
                format: 'legacy'
            }
            break
        case networks.testnet.scriptHash:
            decoded = {
                prefix: 'bchtest',
                type: 'P2SH',
                hash,
                format: 'legacy'
            }
            break
    }
    return decoded
}


/**
 * Convert Bitcoin Private Key to Address
 * @param testnet testnet or mainnet version of address
 * @param privkey private key to use
 * @returns blockchain address
 */
const convertBtcPrivateKey = (testnet: boolean, privkey: string) => {
    const network = testnet ? networks.testnet : networks.bitcoin
    const keyPair = ECPair.fromWIF(privkey, network)
    return payments.p2pkh({ pubkey: keyPair.publicKey, network }).address as string
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
    return generateBtcAddress(testnet, xpub, i)
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
    return generateBtcPrivateKey(testnet, mnemonic, i)
}

/**
 * Generate address from private key
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param privateKey private key to use
 * @returns blockchain private key to the address
 */
export const generateAddressFromPrivatekey = (currency: Currency, testnet: boolean, privateKey: string) => {
    return convertBtcPrivateKey(testnet, privateKey)
}