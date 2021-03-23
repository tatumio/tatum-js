const {
  bech32,
  derivePrivate,
  derivePublic,
  getPubKeyBlake2b224Hash,
  mnemonicToRootKeypair,
  packBaseAddress,
} = require('cardano-crypto.js');

import {
  ADA_DERIVATION_PATH,
  ADA_DERIVATION_SCHEME,
  HARDENED_THRESHOLD,
} from '../constants';

/**
 * Generate an Ada key for the standard derivation path
 * @param mnemonic mnemonic seed to use
 * @returns the key buffer
 */
const generateKey = async (mnemonic: string): Promise<Buffer> => {
  const walletSecret = await mnemonicToRootKeypair(mnemonic, ADA_DERIVATION_SCHEME);
  return ADA_DERIVATION_PATH
    .split('/')
    .slice(1)
    .map(index => index.slice(-1) === '\'' ? HARDENED_THRESHOLD + parseInt(index.slice(0, -1)) : parseInt(index))
    .reduce((secret, index) => derivePrivate(secret, index, ADA_DERIVATION_SCHEME), walletSecret);
};

/**
 * Generate an Ada private key for the standard derivation path
 * @param mnemonic mnemonic seed to use
 * @param i derivation index of private key to generate
 * @returns the (extended) private key string
 */
const generatePrivateKey = async (mnemonic: string, i: number): Promise<string> => {
  // /0/i
  return derivePrivate(
    derivePrivate(await generateKey(mnemonic), 0, ADA_DERIVATION_SCHEME),
    i,
    ADA_DERIVATION_SCHEME
  ).toString('hex');
}

/**
 * Generate an Ada public key for the standard derivation path
 * @param mnemonic mnemonic seed to use
 * @returns the extended public key string (spend + stake)
 */
const generateXPublicKey = async (mnemonic: string): Promise<string> => {
  const root = await generateKey(mnemonic);
  // /0
  const spendXPub = derivePrivate(root, 0, ADA_DERIVATION_SCHEME).slice(64, 128).toString('hex');
  // /2/0
  const stakeXPub = derivePrivate(
    derivePrivate(root, 2, ADA_DERIVATION_SCHEME), 0, ADA_DERIVATION_SCHEME
  ).slice(64, 128).toString('hex');
  return spendXPub + stakeXPub;
}

function xpub2blake2b224Hash(xpub: string) {
  return getPubKeyBlake2b224Hash(Buffer.from(xpub, 'hex').slice(0, 32));
}

/**
 * Generate Carnado address
 * @param testnet extended public key to generate address from
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateAddress = async (testnet: boolean, xpub: string, i: number): Promise<string> => {
  const spendXPub = derivePublic(Buffer.from(xpub.substr(0, 128), 'hex'), i, ADA_DERIVATION_SCHEME);
  const stakeXPub = xpub.substr(128, 128);
  return bech32.encode(
    testnet ? 'addr_test' : 'addr',
    packBaseAddress(
      xpub2blake2b224Hash(spendXPub),
      xpub2blake2b224Hash(stakeXPub),
      testnet ? 0 : 1
    )
  );
}

export default {
  generatePrivateKey,
  generateXPublicKey,
  generateAddress
}
