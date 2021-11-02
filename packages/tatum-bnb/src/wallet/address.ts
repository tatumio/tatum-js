import { getAddressFromPrivateKey } from '@binance-chain/javascript-sdk/lib/crypto'
import { Currency } from '@tatumio/tatum-core'

/**
 * Generate address from private key
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param privateKey private key to use
 * @returns blockchain private key to the address
 */
export const generateAddressFromPrivatekey = (currency: Currency, testnet: boolean, privateKey: string) => {
  return getAddressFromPrivateKey(privateKey, testnet ? 'tbnb' : 'bnb')
}
