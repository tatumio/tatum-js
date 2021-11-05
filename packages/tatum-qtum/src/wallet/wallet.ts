import {generateMnemonic, mnemonicToSeed} from 'bip39';
// @ts-ignore
import hdkey from 'hdkey';
import {
    QTUM_DERIVATION_PATH,
    QTUM_NETWORK_MAINNET,
    QTUM_NETWORK_TESTNET,
} from '../constants';
import {Wallet, Currency, TESTNET_DERIVATION_PATH} from '@tatumio/tatum-core'

/**
 * Generate Qtum wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
export const generateQtumWallet = async (testnet: boolean, mnem: string): Promise<Wallet> => {
    const hdwallet = hdkey.fromMasterSeed(await mnemonicToSeed(mnem), testnet ? QTUM_NETWORK_TESTNET.bip32 : QTUM_NETWORK_MAINNET.bip32)
    return {
        mnemonic: mnem,
        xpub: hdwallet.derive(testnet ? TESTNET_DERIVATION_PATH : QTUM_DERIVATION_PATH).toJSON().xpub
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
    return generateQtumWallet(testnet, mnem)
}
