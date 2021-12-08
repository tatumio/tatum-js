const algosdk = require('algosdk')
const base32 = require('base32.js')

/**
 * Generate Algo Address From Private Key
 * @param privateKey Private key to use
 * @returns blockchain address
 */
export const generateAddressFromPrivatetKey = (privateKey: string) => {
  const decoder = new base32.Decoder({ type: 'rfc4648' })
  const secretKey = decoder.write(privateKey).buf
  const mn = algosdk.secretKeyToMnemonic(secretKey)
  return algosdk.mnemonicToSecretKey(mn).addr
}
