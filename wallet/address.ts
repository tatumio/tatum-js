import {getAddressFromPublicKey, getPrivateKeyFromMnemonic} from '@binance-chain/javascript-sdk/lib/crypto';
import {fromBase58, fromSeed} from 'bip32';
import {mnemonicToSeed} from 'bip39';
import {HDNode, Mnemonic} from 'bitbox-sdk';
import {networks, payments} from 'bitcoinjs-lib';
// @ts-ignore
import ethHdKey from 'ethereumjs-wallet/hdkey';
// @ts-ignore
import {
    BCH_DERIVATION_PATH,
    BTC_DERIVATION_PATH,
    ETH_DERIVATION_PATH,
    LTC_DERIVATION_PATH,
    LTC_NETWORK,
    TEST_LTC_NETWORK,
    TESTNET_DERIVATION_PATH,
    VET_DERIVATION_PATH
} from '../constants';
import {Currency} from '../model/request/Currency';

const generateBtcAddress = (testnet: boolean, xpub: string, i: number) => {
    const network = testnet ? networks.testnet : networks.bitcoin;
    const w = fromBase58(xpub, network).derivePath(String(i));
    return payments.p2pkh({pubkey: w.publicKey, network}).address;
};
const generateLtcAddress = (testnet: boolean, xpub: string, i: number) => {
    const network = testnet ? TEST_LTC_NETWORK : LTC_NETWORK;
    const w = fromBase58(xpub, network).derivePath(String(i));
    return payments.p2pkh({pubkey: w.publicKey, network}).address;
};
const generateBchAddress = (testnet: boolean, xpub: string, i: number) => {
    const node = new HDNode();
    const hdNode = node.fromXPub(xpub).derive(i);
    return node.toCashAddress(hdNode);
};
const generateEthAddress = (testnet: boolean, xpub: string, i: number) => {
    const w = ethHdKey.fromExtendedKey(xpub);
    const wallet = w.deriveChild(i).getWallet();
    return '0x' + wallet.getAddress().toString('hex').toLowerCase();
};
const generateVetAddress = (testnet: boolean, xpub: string, i: number) => {
    const w = ethHdKey.fromExtendedKey(xpub);
    const wallet = w.deriveChild(i).getWallet();
    return '0x' + wallet.getAddress().toString('hex').toLowerCase();
};
const generateBnbAddress = (testnet: boolean, xpub: string, i: number) => {
    const w = fromBase58(xpub, testnet ? networks.testnet : undefined).derive(i);
    return getAddressFromPublicKey(w.publicKey.toString('hex'), testnet ? 'tbnb' : 'bnb');
};

const generateBtcPrivateKey = async (testnet: boolean, mnemonic: string, i: number) => {
    const network = testnet ? networks.testnet : networks.bitcoin;
    return fromSeed(await mnemonicToSeed(mnemonic), network)
        .derivePath(testnet ? TESTNET_DERIVATION_PATH : BTC_DERIVATION_PATH)
        .derive(i)
        .toWIF();
};
const generateLtcPrivateKey = async (testnet: boolean, mnemonic: string, i: number) => {
    const network = testnet ? TEST_LTC_NETWORK : LTC_NETWORK;
    return fromSeed(await mnemonicToSeed(mnemonic), network)
        .derivePath(testnet ? TESTNET_DERIVATION_PATH : LTC_DERIVATION_PATH)
        .derive(i)
        .toWIF();
};
const generateBchPrivateKey = async (testnet: boolean, mnemonic: string, i: number) => {
    const m = new Mnemonic();
    const node = new HDNode();
    const hdNode = node.fromSeed(m.toSeed(mnemonic), testnet ? 'testnet' : 'mainnet')
        .derivePath(`${BCH_DERIVATION_PATH}/${i}`);
    return node.toWIF(hdNode);
};
const generateEthPrivateKey = async (testnet: boolean, mnemonic: string, i: number) => {
    const path = testnet ? TESTNET_DERIVATION_PATH : ETH_DERIVATION_PATH;
    const hdwallet = ethHdKey.fromMasterSeed(mnemonicToSeed(mnemonic));
    const derivePath = hdwallet.derivePath(path).deriveChild(i);
    return derivePath.getWallet().getPrivateKeyString();
};
const generateVetPrivateKey = async (testnet: boolean, mnemonic: string, i: number) => {
    const path = testnet ? TESTNET_DERIVATION_PATH : VET_DERIVATION_PATH;
    const hdwallet = ethHdKey.fromMasterSeed(mnemonicToSeed(mnemonic));
    const derivePath = hdwallet.derivePath(path).deriveChild(i);
    return derivePath.getWallet().getPrivateKeyString();
};
const generateBnbPrivateKey = async (mnemonic: string, i: number) => {
    return getPrivateKeyFromMnemonic(mnemonic, true, i);
};

export const generateAddressFromXPub = (currency: Currency, testnet: boolean, xPub: string, i: number) => {
    switch (currency) {
        case Currency.BTC:
            return generateBtcAddress(testnet, xPub, i);
        case Currency.LTC:
            return generateLtcAddress(testnet, xPub, i);
        case Currency.BCH:
            return generateBchAddress(testnet, xPub, i);
        case Currency.ETH:
            return generateEthAddress(testnet, xPub, i);
        case Currency.VET:
            return generateVetAddress(testnet, xPub, i);
        case Currency.BNB:
            return generateBnbAddress(testnet, xPub, i);
    }
};

export const generatePrivateKeyFromMnemonic = (currency: Currency, testnet: boolean, mnemonic: string, i: number) => {
    switch (currency) {
        case Currency.BTC:
            return generateBtcPrivateKey(testnet, mnemonic, i);
        case Currency.LTC:
            return generateLtcPrivateKey(testnet, mnemonic, i);
        case Currency.BCH:
            return generateBchPrivateKey(testnet, mnemonic, i);
        case Currency.ETH:
            return generateEthPrivateKey(testnet, mnemonic, i);
        case Currency.VET:
            return generateVetPrivateKey(testnet, mnemonic, i);
        case Currency.BNB:
            return generateBnbPrivateKey(mnemonic, i);
    }
};