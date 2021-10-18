const algosdk = require('algosdk');
const base32 = require('base32.js');

/**
 * Generate Algo wallet
 * @param mnemonic mnemonic seed to use
 * @returns address and privateKey
 */
export const generateAlgoWallet = async (mnemonic: string) => {
    const account = algosdk.mnemonicToSecretKey(mnemonic);
    const encoder = new base32.Encoder({type: "rfc4648"});
    const privateKey = encoder.write(account.sk).finalize();
    return {
        address: account.addr,
        privateKey: privateKey,
    }
}
