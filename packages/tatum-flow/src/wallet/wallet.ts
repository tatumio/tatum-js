import {generateMnemonic, mnemonicToSeed} from 'bip39';
// @ts-ignore
import hdkey from 'hdkey';
import {
    Currency,
    Wallet,
} from '@tatumio/tatum-core';
import {FLOW_DERIVATION_PATH} from "src/constants";

/**
 * Generate Flow or FUSD wallet
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
export const generateFlowWallet = async (mnem: string): Promise<Wallet> => {
    const hdwallet = hdkey.fromMasterSeed(await mnemonicToSeed(mnem))
    return {
        mnemonic: mnem,
        xpub: hdwallet.derive(FLOW_DERIVATION_PATH).toJSON().xpub
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
    return generateFlowWallet(mnem)
}
