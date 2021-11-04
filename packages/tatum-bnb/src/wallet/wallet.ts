import { generatePrivateKey, getAddressFromPrivateKey } from '@binance-chain/javascript-sdk/lib/crypto'
import { Currency, Wallet } from '@tatumio/tatum-core'

/**
 * Generate BnB wallet
 * @param testnet testnet or mainnet version of address
 * @returns wallet
 */
export const generateBnbWallet = async (testnet: boolean): Promise<Wallet> => {
  const privateKey = generatePrivateKey()
  const prefix = testnet ? 'tbnb' : 'bnb'
  return {
    address: getAddressFromPrivateKey(privateKey, prefix),
    privateKey,
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
  return generateBnbWallet(testnet)
}
