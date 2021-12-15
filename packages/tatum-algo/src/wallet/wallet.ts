const algosdk = require('algosdk')
const base32 = require('base32.js')
import { WalletWithAddress } from '@tatumio/tatum-core'

/**
 * Generate Algo wallet
 * @param mnem optional mnemonic seed to use
 * @returns address and secret
 */
export const generateBlockchainWallet = async (mnem?: string): Promise<WalletWithAddress> => {
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
 * @param mnemonic optional mnemonic seed to use. If not present, new one will be generated
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = (mnemonic?: string) => {
  return generateBlockchainWallet(mnemonic)
}
