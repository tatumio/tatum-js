import { Currency, TESTNET_DERIVATION_PATH } from '@tatumio/tatum-core';
import ethWallet, {hdkey as ethHdKey} from 'ethereumjs-wallet';
import { MATIC_DERIVATION_PATH } from '../constants';
import {mnemonicToSeed} from 'bip39';
// @ts-ignore

/**
 * Generate Polygon or any other ERC20 private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
 const generatePolygonPrivateKey = async (testnet: boolean, mnemonic: string, i: number): Promise<string> => {
    const path = testnet ? TESTNET_DERIVATION_PATH : MATIC_DERIVATION_PATH
    const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnemonic))
    const derivePath = hdwallet.derivePath(path).deriveChild(i)
    return derivePath.getWallet().getPrivateKeyString()
}

/**
 * Convert Ethereum Private Key to Address
 * @param testnet testnet or mainnet version of address
 * @param privkey private key to use
 * @returns blockchain address
 */
 const convertEthPrivateKey = (testnet: boolean, privkey: string) => {
    const wallet = ethWallet.fromPrivateKey(Buffer.from(privkey.replace('0x', ''), 'hex'))
    return wallet.getAddressString() as string
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
    return generatePolygonPrivateKey(testnet, mnemonic, i)
}

/**
 * Generate address from private key
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param privateKey private key to use
 * @returns blockchain private key to the address
 */
export const generateAddressFromPrivatekey = (currency: Currency, testnet: boolean, privateKey: string) => {
    return convertEthPrivateKey(testnet, privateKey)
}
