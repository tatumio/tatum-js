import { Currency, Wallet } from '@tatumio/tatum-core'
import { RippleAPI } from 'ripple-lib'

/**
 * Generate Xrp address and secret.
 */
export const generateXrpWallet = async (): Promise<Wallet> => {
  const { address, secret } = new RippleAPI().generateAddress()
  return { address, privateKey: secret }
}

/**
 * Generate wallet
 * @param currency blockchain to generate wallet for
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic seed to use. If not present, new one will be generated
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = (currency: Currency, testnet: boolean, mnemonic?: string) => {
  return generateXrpWallet()
}
