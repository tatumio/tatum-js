const algosdk = require('algosdk');
const base32 = require('base32.js');

/**
 * Generate Algo Address From Private Key
 * @param privateKey Private key to use
 * @returns blockchain address
 */
export const generateAlgoAddressFromPrivatetKey = (privateKey: string) => {
    const decoder = new base32.Decoder({type: "rfc4648"})
    const secretKey = decoder.write(privateKey).buf;
    const mnemonic = algosdk.secretKeyToMnemonic(secretKey)
    return algosdk.mnemonicToSecretKey(mnemonic).addr;
}