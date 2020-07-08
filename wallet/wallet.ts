import Neon, {wallet} from '@cityofzion/neon-js';
import {fromSeed} from 'bip32';
import {generateMnemonic, mnemonicToSeed} from 'bip39';
import {HDNode, Mnemonic} from 'bitbox-sdk';
import {networks} from 'bitcoinjs-lib';
// @ts-ignore
import ethHdKey from 'ethereumjs-wallet/hdkey';
// @ts-ignore
import hdkey from 'hdkey';
import {RippleAPI} from 'ripple-lib';
import {Keypair} from 'stellar-sdk';
import {
    BCH_DERIVATION_PATH,
    BNB_DERIVATION_PATH,
    BTC_DERIVATION_PATH,
    ETH_DERIVATION_PATH,
    LTC_DERIVATION_PATH,
    LTC_NETWORK,
    TEST_LTC_NETWORK,
    TESTNET_DERIVATION_PATH,
    VET_DERIVATION_PATH
} from '../constants';
import {Currency} from '../model';

export const generateBnbWallet = async (testnet: boolean, mnem: string) => {
    const hdwallet = fromSeed(await mnemonicToSeed(mnem), testnet ? networks.testnet : undefined);
    const derivePath = hdwallet.derivePath(BNB_DERIVATION_PATH);
    return {
        xpub: derivePath.neutered().toBase58(),
        xpriv: (derivePath.privateKey as Buffer).toString('hex'),
        mnemonic: mnem,
    };
};

export const generateVetWallet = async (testnet: boolean, mnem: string) => {
    const path = testnet ? TESTNET_DERIVATION_PATH : VET_DERIVATION_PATH;
    const hdwallet = hdkey.fromMasterSeed(await mnemonicToSeed(mnem));
    const derivePath = hdwallet.derivePath(path);
    return {xpub: derivePath.publicExtendedKey(), xpriv: derivePath.privateExtendedKey(), mnemonic: mnem};
};

export const generateEthWallet = async (testnet: boolean, mnem: string) => {
    const path = testnet ? TESTNET_DERIVATION_PATH : ETH_DERIVATION_PATH;
    const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnem));
    const derivePath = hdwallet.derivePath(path);
    return {xpub: derivePath.publicExtendedKey(), xpriv: derivePath.privateExtendedKey(), mnemonic: mnem};
};

export const generateBchWallet = (testnet: boolean, mnem: string) => {
    const m = new Mnemonic();
    const node = new HDNode();
    const rootSeedBuffer = m.toSeed(mnem);
    const hdNode = node.fromSeed(rootSeedBuffer, testnet ? 'testnet' : 'mainnet');
    const path = node.derivePath(hdNode, BCH_DERIVATION_PATH);
    return {
        mnemonic: mnem,
        xpub: node.toXPub(path),
        xpriv: node.toXPriv(path),
    };
};

export const generateBtcWallet = async (testnet: boolean, mnem: string): Promise<{ mnemonic: string, xpub: string, xpriv: string }> => {
    const hdwallet = hdkey.fromMasterSeed(await mnemonicToSeed(mnem), testnet ? networks.testnet.bip32 : networks.bitcoin.bip32);
    return {mnemonic: mnem, ...hdwallet.derive(testnet ? TESTNET_DERIVATION_PATH : BTC_DERIVATION_PATH).toJSON()};
};

export const generateLtcWallet = async (testnet: boolean, mnem: string): Promise<{ mnemonic: string, xpub: string, xpriv: string }> => {
    const hdwallet = hdkey.fromMasterSeed(await mnemonicToSeed(mnem), testnet ? TEST_LTC_NETWORK.bip32 : LTC_NETWORK.bip32);
    return {mnemonic: mnem, ...hdwallet.derive(testnet ? TESTNET_DERIVATION_PATH : LTC_DERIVATION_PATH).toJSON()};
};

export const generateNeoWallet = () => {
    const privateKey = Neon.create.privateKey();
    return {privateKey, address: new wallet.Account(privateKey).address};
};

export const generateXrpWallet = () => {
    const {address, secret} = new RippleAPI().generateAddress();
    return {address, secret};
};

export const generateXlmWallet = () => {
    const keypair = Keypair.random();
    return {address: keypair.publicKey(), secret: keypair.secret()};
};

export const generateWallet = (currency: Currency, testnet: boolean, mnemonic?: string) => {
    const mnem = mnemonic ? mnemonic : generateMnemonic(256);
    switch (currency) {
        case Currency.BTC:
            return generateBtcWallet(testnet, mnem);
        case Currency.LTC:
            return generateLtcWallet(testnet, mnem);
        case Currency.BCH:
            return generateBchWallet(testnet, mnem);
        case Currency.ETH:
            return generateEthWallet(testnet, mnem);
        case Currency.XRP:
            return generateXrpWallet();
        case Currency.XLM:
            return generateXlmWallet();
        case Currency.VET:
            return generateVetWallet(testnet, mnem);
        case Currency.NEO:
            return generateNeoWallet();
        case Currency.BNB:
            return generateBnbWallet(testnet, mnem);
        default:
            throw new Error('Unsupported blockchain.');
    }
};