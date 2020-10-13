import {fromBase58, fromSeed} from 'bip32';
import {mnemonicToSeed} from 'bip39';
import {HDNode, Mnemonic} from 'bitbox-sdk';
import {networks, payments} from 'bitcoinjs-lib';
import {hdkey as ethHdKey} from 'ethereumjs-wallet';
// @ts-ignore
import {
    BCH_DERIVATION_PATH,
    BTC_DERIVATION_PATH,
    ETH_DERIVATION_PATH,
    LTC_DERIVATION_PATH,
    LTC_NETWORK,
    LTC_TEST_NETWORK,
    TESTNET_DERIVATION_PATH,
    VET_DERIVATION_PATH
} from '../constants';
import {Currency} from '../model';

/**
 * Generate Bitcoin address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^32 addresses can be generated.
 * @returns blockchain address
 */
const generateBtcAddress = (testnet: boolean, xpub: string, i: number) => {
    const network = testnet ? networks.testnet : networks.bitcoin;
    const w = fromBase58(xpub, network).derivePath(String(i));
    return payments.p2pkh({pubkey: w.publicKey, network}).address as string;
};

/**
 * Generate Litecoin address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^32 addresses can be generated.
 * @returns blockchain address
 */
const generateLtcAddress = (testnet: boolean, xpub: string, i: number) => {
    const network = testnet ? LTC_TEST_NETWORK : LTC_NETWORK;
    const w = fromBase58(xpub, network).derivePath(String(i));
    return payments.p2pkh({pubkey: w.publicKey, network}).address as string;
};

/**
 * Generate Bitcoin Cash address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^32 addresses can be generated.
 * @returns blockchain address
 */
const generateBchAddress = (testnet: boolean, xpub: string, i: number) => {
    const node = new HDNode();
    const hdNode = node.fromXPub(xpub).derive(i);
    return node.toCashAddress(hdNode);
};

/**
 * Generate Ethereum or any other ERC20 address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^32 addresses can be generated.
 * @returns blockchain address
 */
const generateEthAddress = (testnet: boolean, xpub: string, i: number) => {
    const w = ethHdKey.fromExtendedKey(xpub);
    const wallet = w.deriveChild(i).getWallet();
    return '0x' + wallet.getAddress().toString('hex').toLowerCase();
};

/**
 * Generate VeChain address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^32 addresses can be generated.
 * @returns blockchain address
 */
const generateVetAddress = (testnet: boolean, xpub: string, i: number) => {
    const w = ethHdKey.fromExtendedKey(xpub);
    const wallet = w.deriveChild(i).getWallet();
    return '0x' + wallet.getAddress().toString('hex').toLowerCase();
};

/**
 * Generate Bitcoin private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateBtcPrivateKey = async (testnet: boolean, mnemonic: string, i: number) => {
    const network = testnet ? networks.testnet : networks.bitcoin;
    return fromSeed(await mnemonicToSeed(mnemonic), network)
        .derivePath(testnet ? TESTNET_DERIVATION_PATH : BTC_DERIVATION_PATH)
        .derive(i)
        .toWIF();
};

/**
 * Generate Litecoin private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateLtcPrivateKey = async (testnet: boolean, mnemonic: string, i: number) => {
    const network = testnet ? LTC_TEST_NETWORK : LTC_NETWORK;
    return fromSeed(await mnemonicToSeed(mnemonic), network)
        .derivePath(testnet ? TESTNET_DERIVATION_PATH : LTC_DERIVATION_PATH)
        .derive(i)
        .toWIF();
};

/**
 * Generate Bitcoin Cash private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateBchPrivateKey = async (testnet: boolean, mnemonic: string, i: number) => {
    const m = new Mnemonic();
    const node = new HDNode();
    const hdNode = node.fromSeed(m.toSeed(mnemonic), testnet ? 'testnet' : 'mainnet')
        .derivePath(`${BCH_DERIVATION_PATH}/${i}`);
    return node.toWIF(hdNode);
};

/**
 * Generate Ethereum or any other ERC20 private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateEthPrivateKey = async (testnet: boolean, mnemonic: string, i: number): Promise<string> => {
    const path = testnet ? TESTNET_DERIVATION_PATH : ETH_DERIVATION_PATH;
    const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnemonic));
    const derivePath = hdwallet.derivePath(path).deriveChild(i);
    return derivePath.getWallet().getPrivateKeyString();
};

/**
 * Generate VeChain private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateVetPrivateKey = async (testnet: boolean, mnemonic: string, i: number): Promise<string> => {
    const path = testnet ? TESTNET_DERIVATION_PATH : VET_DERIVATION_PATH;
    const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnemonic));
    const derivePath = hdwallet.derivePath(path).deriveChild(i);
    return derivePath.getWallet().getPrivateKeyString();
};

/**
 * Generate address
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^32 addresses can be generated.
 * @returns blockchain address
 */
export const generateAddressFromXPub = (currency: Currency, testnet: boolean, xpub: string, i: number) => {
    switch (currency) {
        case Currency.BTC:
            return generateBtcAddress(testnet, xpub, i);
        case Currency.LTC:
            return generateLtcAddress(testnet, xpub, i);
        case Currency.BCH:
            return generateBchAddress(testnet, xpub, i);
        case Currency.USDT:
        case Currency.LEO:
        case Currency.LINK:
        case Currency.UNI:
        case Currency.FREE:
        case Currency.MKR:
        case Currency.USDC:
        case Currency.BAT:
        case Currency.TUSD:
        case Currency.PAX:
        case Currency.PAXG:
        case Currency.PLTC:
        case Currency.XCON:
        case Currency.ETH:
        case Currency.MMY:
            return generateEthAddress(testnet, xpub, i);
        case Currency.VET:
            return generateVetAddress(testnet, xpub, i);
        default:
            throw new Error('Unsupported blockchain.');
    }
};

/**
 * Generate private key from mnemonic seed
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
export const generatePrivateKeyFromMnemonic = (currency: Currency, testnet: boolean, mnemonic: string, i: number) => {
    switch (currency) {
        case Currency.BTC:
            return generateBtcPrivateKey(testnet, mnemonic, i);
        case Currency.LTC:
            return generateLtcPrivateKey(testnet, mnemonic, i);
        case Currency.BCH:
            return generateBchPrivateKey(testnet, mnemonic, i);
        case Currency.USDT:
        case Currency.LEO:
        case Currency.LINK:
        case Currency.UNI:
        case Currency.FREE:
        case Currency.MKR:
        case Currency.USDC:
        case Currency.BAT:
        case Currency.TUSD:
        case Currency.PAX:
        case Currency.PAXG:
        case Currency.PLTC:
        case Currency.XCON:
        case Currency.ETH:
        case Currency.MMY:
            return generateEthPrivateKey(testnet, mnemonic, i);
        case Currency.VET:
            return generateVetPrivateKey(testnet, mnemonic, i);
        default:
            throw new Error('Unsupported blockchain.');
    }
};