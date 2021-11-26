import { generatePrivateKey, getAddressFromPrivateKey } from '@binance-chain/javascript-sdk/lib/crypto'
import { WalletWithAddress } from '@tatumio/tatum-ledger'

/**
 * Generate BnB wallet
 * @param testnet testnet or mainnet version of address
 * @returns wallet
 */
export const generateBnbWallet = async (testnet: boolean): Promise<WalletWithAddress> => {
  const privateKey = generatePrivateKey()
  const prefix = testnet ? 'tbnb' : 'bnb'
  return {
    address: getAddressFromPrivateKey(privateKey, prefix),
    privateKey,
  }
}

/**
 * Generate wallet
 * @param options.testnet optional testnet or mainnet version of address
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = (_mnemonic?: string, options?: { testnet?: boolean }) => {
  return generateBnbWallet(!!options?.testnet)
}
