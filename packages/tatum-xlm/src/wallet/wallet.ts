import { Keypair } from 'stellar-sdk'
import { Currency } from '@tatumio/tatum-core'

/**
 * Generate Stellar address and secret.
 * @param secret secret of the account to generate address
 */
export const generateXlmWallet = (secret?: string) => {
  const keypair = secret ? Keypair.fromSecret(secret) : Keypair.random()
  return { address: keypair.publicKey(), secret: keypair.secret() }
}

/**
 * Generate wallet
 * @param currency blockchain to generate wallet for
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic seed to use. If not present, new one will be generated
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = (currency: Currency, testnet: boolean, mnemonic?: string) => {
  return generateXlmWallet()
}
