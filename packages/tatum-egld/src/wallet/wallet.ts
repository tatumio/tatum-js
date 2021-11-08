import {generateMnemonic} from 'bip39';
import {Currency, Wallet} from '@tatumio/tatum-core';

/**
 * Generate EGLD wallet
 * @param testnet
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
export const generateEgldWallet = async (mnem: string): Promise<Wallet> => {
    return {
        mnemonic: mnem,
        xpub: ''
    } as Wallet
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
    return generateEgldWallet(mnem)
}
