import {wallet} from '@cityofzion/neon-js';
import {generateMnemonic, mnemonicToSeed} from 'bip39';
import {bip32} from 'bitcoinjs-lib';
import {
    TRON_DERIVATION_PATH,
} from '../constants';
import {Currency} from '@tatumio/tatum-core';

export interface Wallet {

    /**
     * mnemonic seed
     */
    mnemonic: string;

    /**
     * extended public key to derive addresses from
     */
    xpub: string;
}

/**
 * Generate Tron wallet
 * @returns mnemonic for the wallet
 */
export const generateTronWallet = async (mnem: string) => {
    const w = bip32.fromSeed(await mnemonicToSeed(mnem))
    const bip32Interface = w.derivePath(TRON_DERIVATION_PATH)
    return {
        mnemonic: mnem,
        xpub: bip32Interface.publicKey.toString('hex') + bip32Interface.chainCode.toString('hex')
    }
}

/**
 * Generate wallet
 * @param currency blockchain to generate wallet for
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic seed to use. If not present, new one will be generated
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = (currency: Currency, testnet: boolean, mnemonic?: string) => {
    const mnem = mnemonic ? mnemonic : generateMnemonic(256)
    return generateTronWallet(mnem)
}
