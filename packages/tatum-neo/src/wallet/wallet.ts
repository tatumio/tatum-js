import Neon, { wallet } from '@cityofzion/neon-js'
import { WalletWithAddress } from '@tatumio/tatum-ledger'

/**
 * Generate Neo address and private key.
 */
export const generateNeoWallet = (): WalletWithAddress => {
  const privateKey = Neon.create.privateKey()
  return { privateKey, address: new wallet.Account(privateKey).address }
}
