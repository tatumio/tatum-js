import { Currency } from '../model';
/**
 * Generate address
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^32 addresses can be generated.
 * @returns blockchain address
 */
export declare const generateAddressFromXPub: (currency: Currency, testnet: boolean, xpub: string, i: number) => string;
/**
 * Generate private key from mnemonic seed
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
export declare const generatePrivateKeyFromMnemonic: (currency: Currency, testnet: boolean, mnemonic: string, i: number) => Promise<string>;
/**
 * Generate address from private key
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param privkey private key to use
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
export declare const generateAddressFromPrivatekey: (currency: Currency, testnet: boolean, privatekey: string) => string;
