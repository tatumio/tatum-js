import { generatePrivateKey, getAddressFromPrivateKey } from '@binance-chain/javascript-sdk/lib/crypto'
import { WalletWithAddress } from '@tatumio/tatum-core'

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
 * @param currency blockchain to generate wallet for
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic seed to use. If not present, new one will be generated
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = (testnet: boolean) => {
  return generateBnbWallet(testnet)
}
