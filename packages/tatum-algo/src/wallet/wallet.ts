const algosdk = require('algosdk')
const base32 = require('base32.js')
import { WalletWithAddress } from '@tatumio/tatum-ledger'

/**
 * Generate Algo wallet
 * @param mnem mnemonic seed to use
 * @returns address and secret
 */
export const generateAlgoWallet = async (mnem?: string): Promise<WalletWithAddress> => {
  const account = mnem ? algosdk.mnemonicToSecretKey(mnem) : algosdk.generateAccount()
  const encoder = new base32.Encoder({ type: 'rfc4648' })
  const secret = encoder.write(account.sk).finalize()
  return {
    address: account.addr,
    privateKey: secret,
  }
}

/**
 * Generate wallet
 * @param currency blockchain to generate wallet for
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic seed to use. If not present, new one will be generated
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = (mnemonic?: string) => {
  return generateAlgoWallet(mnemonic)
}
