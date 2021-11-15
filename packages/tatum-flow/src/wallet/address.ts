import {fromBase58, fromSeed} from 'bip32';
import {mnemonicToSeed} from 'bip39';
import * as elliptic from 'elliptic';
import {
    Currency,
} from '@tatumio/tatum-core';
import {FLOW_DERIVATION_PATH} from "src/constants";

/**
 * Generate FLOW or FUSD public key
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateFlowPublicKey = (xpub: string, i: number) => {
    const w = fromBase58(xpub).derivePath(String(i))
    const s = new elliptic.ec('secp256k1').keyFromPublic(w.publicKey).getPublic().encode('hex', false)
    return s.slice(2)
}

/**
 * Generate FLOW or FUSD public key from private key
 * @returns blockchain address
 */
export const generateFlowPublicKeyFromPrivateKey = (pk: string) => {
    const s = new elliptic.ec('secp256k1').keyFromPrivate(pk).getPublic().encode('hex', false)
    return s.slice(2)
}

/**
 * Generate Flow private key from mnemonic seed
 * @returns blockchain private key to the address
 */
const generateFlowPrivateKey = async (mnemonic: string, i: number, alg = 'secp256k1') => {
    const key = fromSeed(await mnemonicToSeed(mnemonic))
        .derivePath(FLOW_DERIVATION_PATH)
        .derive(i)
        .privateKey as Buffer
    return new elliptic.ec(alg).keyFromPrivate(key).getPrivate().toString(16)
}

/**
 * Generate address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
export const generateAddressFromXPub = (xpub: string, i: number) => {
    return generateFlowPublicKey(xpub, i)
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
    return generateFlowPrivateKey(mnemonic, i)
}
