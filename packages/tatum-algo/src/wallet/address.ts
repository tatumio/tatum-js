const algosdk = require('algosdk');
const base32 = require('base32.js');

/**
 * Generate Algo Address From Private Key
 * @param privKey Private key to use
 * @returns blockchain address
 */
 export const generateAlgodAddressFromPrivatetKey = (privKey: string) => {
    const decoder = new base32.Decoder({type: "rfc4648"})
    const secretKey = decoder.write(privKey).buf;
    const mn = algosdk.secretKeyToMnemonic(secretKey)
    return algosdk.mnemonicToSecretKey(mn).addr;
}
