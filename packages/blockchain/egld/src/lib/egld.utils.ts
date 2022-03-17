import * as bech32 from 'bech32'
import { getPublicKey } from 'ed25519-hd-key'

/**
 * Generate address from private key
 * @param privateKey private key to use
 * @returns blockchain private key to the address
 */
export const generateAddressFromPrivatekey = (privKey: string) => {
  const publicKey = getPublicKey(Buffer.from(privKey, 'hex'), false).toString('hex')
  const words = bech32.toWords(Buffer.from(publicKey.slice(-64), 'hex'))
  const address = bech32.encode('erd', words)

  return address
}
