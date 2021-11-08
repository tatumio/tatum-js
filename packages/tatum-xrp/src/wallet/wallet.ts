import { WalletWithAddress } from '@tatumio/tatum-core'
import { RippleAPI } from 'ripple-lib'

/**
 * Generate Xrp address and secret.
 */
export const generateXrpWallet = async (): Promise<WalletWithAddress> => {
  const { address, secret } = new RippleAPI().generateAddress()
  // TODO: ripple-lib has been renamed to xrpl; should we update the dependency? Address is possible undefined.
  if (address === undefined) {
    throw new Error('Could not generate XRP address')
  }
  return { address, privateKey: secret }
}

/**
 * Generate wallet
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = () => {
  return generateXrpWallet()
}
