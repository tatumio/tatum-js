import Neon, { wallet } from '@cityofzion/neon-js'

/**
 * Generate Neo address and private key.
 */
export const generateNeoWallet = () => {
  const privateKey = Neon.create.privateKey()
  return { privateKey, address: new wallet.Account(privateKey).address }
}
