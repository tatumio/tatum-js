const algosdk = require('algosdk')
const base32 = require('base32.js')
import {Currency} from '@tatumio/tatum-core'
/**
 * Generate Algo wallet
 * @param mnemonic mnemonic seed to use
 * @returns address and privateKey
 */
export const generateAlgoWallet = async (mnemonic: string) => {
    const account = algosdk.mnemonicToSecretKey(mnemonic)
    const encoder = new base32.Encoder({type: "rfc4648"})
    const privateKey = encoder.write(account.sk).finalize()
    return {
        address: account.addr,
        privateKey: privateKey,
    }
}

/**
 * Generate Algo New Wallet
 * @returns address and privateKey
 */
export const generateAlgoNewWallet = async () => {
    const account = algosdk.generateAccount()
    const encoder = new base32.Encoder({type: "rfc4648"})
    const privateKey = encoder.write(account.sk).finalize()
    return {
        address: account.addr,
        privateKey: privateKey,
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
    return mnemonic ? generateAlgoWallet(mnemonic) : generateAlgoNewWallet()
}