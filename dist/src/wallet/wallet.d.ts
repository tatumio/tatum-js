import { Currency } from '../model';
export interface Wallet {
    /**
     * mnemonic seed
     */
    mnemonic: string;
    /**
     * extended public key to derive addresses from
     */
    xpub: string;
}
/**
 * Generate BnB wallet
 * @param testnet testnet or mainnet version of address
 * @returns wallet
 */
export declare const generateBnbWallet: (testnet: boolean) => Promise<{
    address: string;
    privateKey: string;
}>;
/**
 * Generate VeChain wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
export declare const generateVetWallet: (testnet: boolean, mnem: string) => Promise<Wallet>;
/**
 * Generate Ethereum or any other ERC20 wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
export declare const generateEthWallet: (testnet: boolean, mnem: string) => Promise<Wallet>;
/**
 * Generate Bitcoin Cash wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
export declare const generateBchWallet: (testnet: boolean, mnem: string) => Wallet;
/**
 * Generate Bitcoin wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
export declare const generateBtcWallet: (testnet: boolean, mnem: string) => Promise<Wallet>;
/**
 * Generate Cardano wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
export declare const generateAdaWallet: (testnet: boolean, mnem: string) => Promise<Wallet>;
/**
 * Generate Litecoin wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
export declare const generateLtcWallet: (testnet: boolean, mnem: string) => Promise<Wallet>;
/**
 * Generate Neo address and private key.
 */
export declare const generateNeoWallet: () => {
    privateKey: string;
    address: string;
};
/**
 * Generate Xrp address and secret.
 */
export declare const generateXrpWallet: () => {
    address: string | undefined;
    secret: string;
};
/**
 * Generate Stellar address and secret.
 * @param secret secret of the account to generate address
 */
export declare const generateXlmWallet: (secret?: string | undefined) => {
    address: string;
    secret: string;
};
/**
 * Generate Scrypta wallet
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
export declare const generateLyraWallet: (mnem: string) => Promise<Wallet>;
/**
 * Generate wallet
 * @param currency blockchain to generate wallet for
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic seed to use. If not present, new one will be generated
 * @returns wallet or a combination of address and private key
 */
export declare const generateWallet: (currency: Currency, testnet: boolean, mnemonic?: string | undefined) => Wallet | Promise<Wallet> | Promise<{
    address: string;
    privateKey: string;
}> | {
    privateKey: string;
    address: string;
} | {
    address: string | undefined;
    secret: string;
};
