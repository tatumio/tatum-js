"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAddressFromPrivatekey = exports.generatePrivateKeyFromMnemonic = exports.generateAddressFromXPub = void 0;
const bip32_1 = require("bip32");
const bip39_1 = require("bip39");
const bitbox_sdk_1 = require("bitbox-sdk");
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const cardano_wallet_1 = require("cardano-wallet");
const ethereumjs_wallet_1 = require("ethereumjs-wallet");
// @ts-ignore
const constants_1 = require("../constants");
const model_1 = require("../model");
/**
 * Generate Bitcoin address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^32 addresses can be generated.
 * @returns blockchain address
 */
const generateBtcAddress = (testnet, xpub, i) => {
    const network = testnet ? bitcoinjs_lib_1.networks.testnet : bitcoinjs_lib_1.networks.bitcoin;
    const w = bip32_1.fromBase58(xpub, network).derivePath(String(i));
    return bitcoinjs_lib_1.payments.p2pkh({ pubkey: w.publicKey, network }).address;
};
/**
 * Generate Cardano address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^32 addresses can be generated.
 * @returns blockchain address
 */
const generateAdaAddress = (testnet, xpub, i) => {
    const network = testnet ? cardano_wallet_1.BlockchainSettings.from_json({ protocol_magic: 1097911063 }) : cardano_wallet_1.BlockchainSettings.mainnet();
    return cardano_wallet_1.Bip44ChainPublic.new(cardano_wallet_1.PublicKey.from_hex(xpub), cardano_wallet_1.DerivationScheme.v2())
        .address_key(cardano_wallet_1.AddressKeyIndex.new(i))
        .bootstrap_era_address(network)
        .to_base58();
};
/**
 * Generate Litecoin address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^32 addresses can be generated.
 * @returns blockchain address
 */
const generateLtcAddress = (testnet, xpub, i) => {
    const network = testnet ? constants_1.LTC_TEST_NETWORK : constants_1.LTC_NETWORK;
    const w = bip32_1.fromBase58(xpub, network).derivePath(String(i));
    return bitcoinjs_lib_1.payments.p2pkh({ pubkey: w.publicKey, network }).address;
};
/**
 * Generate Bitcoin Cash address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^32 addresses can be generated.
 * @returns blockchain address
 */
const generateBchAddress = (testnet, xpub, i) => {
    const node = new bitbox_sdk_1.HDNode();
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
const generateEthAddress = (testnet, xpub, i) => {
    const w = ethereumjs_wallet_1.hdkey.fromExtendedKey(xpub);
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
const generateVetAddress = (testnet, xpub, i) => {
    const w = ethereumjs_wallet_1.hdkey.fromExtendedKey(xpub);
    const wallet = w.deriveChild(i).getWallet();
    return '0x' + wallet.getAddress().toString('hex').toLowerCase();
};
/**
 * Generate Bitcoin address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^32 addresses can be generated.
 * @returns blockchain address
 */
const generateLyraAddress = (testnet, xpub, i) => {
    const network = testnet ? constants_1.LYRA_TEST_NETWORK : constants_1.LYRA_NETWORK;
    const w = bip32_1.fromBase58(xpub, network).derivePath(String(i));
    return bitcoinjs_lib_1.payments.p2pkh({ pubkey: w.publicKey, network }).address;
};
/**
 * Generate Bitcoin private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateBtcPrivateKey = async (testnet, mnemonic, i) => {
    const network = testnet ? bitcoinjs_lib_1.networks.testnet : bitcoinjs_lib_1.networks.bitcoin;
    return bip32_1.fromSeed(await bip39_1.mnemonicToSeed(mnemonic), network)
        .derivePath(testnet ? constants_1.TESTNET_DERIVATION_PATH : constants_1.BTC_DERIVATION_PATH)
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
const generateLtcPrivateKey = async (testnet, mnemonic, i) => {
    const network = testnet ? constants_1.LTC_TEST_NETWORK : constants_1.LTC_NETWORK;
    return bip32_1.fromSeed(await bip39_1.mnemonicToSeed(mnemonic), network)
        .derivePath(testnet ? constants_1.TESTNET_DERIVATION_PATH : constants_1.LTC_DERIVATION_PATH)
        .derive(i)
        .toWIF();
};
/**
 * Generate Cardano private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateAdaPrivateKey = async (testnet, mnemonic, i) => {
    const entropy = cardano_wallet_1.Entropy.from_english_mnemonics(mnemonic);
    const hdwallet = cardano_wallet_1.Bip44RootPrivateKey.recover(entropy, '');
    return hdwallet.bip44_account(cardano_wallet_1.AccountIndex.new(0x80000000)).bip44_chain(false).address_key(cardano_wallet_1.AddressKeyIndex.new(i)).to_hex();
};
/**
 * Generate Bitcoin Cash private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateBchPrivateKey = async (testnet, mnemonic, i) => {
    const m = new bitbox_sdk_1.Mnemonic();
    const node = new bitbox_sdk_1.HDNode();
    const hdNode = node.fromSeed(m.toSeed(mnemonic), testnet ? 'testnet' : 'mainnet')
        .derivePath(`${constants_1.BCH_DERIVATION_PATH}/${i}`);
    return node.toWIF(hdNode);
};
/**
 * Generate Ethereum or any other ERC20 private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateEthPrivateKey = async (testnet, mnemonic, i) => {
    const path = testnet ? constants_1.TESTNET_DERIVATION_PATH : constants_1.ETH_DERIVATION_PATH;
    const hdwallet = ethereumjs_wallet_1.hdkey.fromMasterSeed(await bip39_1.mnemonicToSeed(mnemonic));
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
const generateVetPrivateKey = async (testnet, mnemonic, i) => {
    const path = testnet ? constants_1.TESTNET_DERIVATION_PATH : constants_1.VET_DERIVATION_PATH;
    const hdwallet = ethereumjs_wallet_1.hdkey.fromMasterSeed(await bip39_1.mnemonicToSeed(mnemonic));
    const derivePath = hdwallet.derivePath(path).deriveChild(i);
    return derivePath.getWallet().getPrivateKeyString();
};
/**
 * Generate Scrypta private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateLyraPrivateKey = async (testnet, mnemonic, i) => {
    const network = testnet ? constants_1.LYRA_TEST_NETWORK : constants_1.LYRA_NETWORK;
    return bip32_1.fromSeed(await bip39_1.mnemonicToSeed(mnemonic), network)
        .derivePath(constants_1.LYRA_DERIVATION_PATH)
        .derive(i)
        .toWIF();
};
/**
 * Convert Bitcoin Private Key to Address
 * @param testnet testnet or mainnet version of address
 * @param privkey private key to use
 * @returns blockchain address
 */
const convertBtcPrivateKey = (testnet, privkey) => {
    const network = testnet ? bitcoinjs_lib_1.networks.testnet : bitcoinjs_lib_1.networks.bitcoin;
    const keyPair = bitcoinjs_lib_1.ECPair.fromWIF(privkey);
    return bitcoinjs_lib_1.payments.p2pkh({ pubkey: keyPair.publicKey, network }).address;
};
/**
 * Generate address
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^32 addresses can be generated.
 * @returns blockchain address
 */
exports.generateAddressFromXPub = (currency, testnet, xpub, i) => {
    switch (currency) {
        case model_1.Currency.BTC:
            return generateBtcAddress(testnet, xpub, i);
        case model_1.Currency.ADA:
            return generateAdaAddress(testnet, xpub, i);
        case model_1.Currency.LTC:
            return generateLtcAddress(testnet, xpub, i);
        case model_1.Currency.BCH:
            return generateBchAddress(testnet, xpub, i);
        case model_1.Currency.USDT:
        case model_1.Currency.LEO:
        case model_1.Currency.LINK:
        case model_1.Currency.UNI:
        case model_1.Currency.FREE:
        case model_1.Currency.MKR:
        case model_1.Currency.USDC:
        case model_1.Currency.BAT:
        case model_1.Currency.TUSD:
        case model_1.Currency.PAX:
        case model_1.Currency.PAXG:
        case model_1.Currency.PLTC:
        case model_1.Currency.XCON:
        case model_1.Currency.ETH:
        case model_1.Currency.MMY:
            return generateEthAddress(testnet, xpub, i);
        case model_1.Currency.VET:
            return generateVetAddress(testnet, xpub, i);
        case model_1.Currency.LYRA:
            return generateLyraAddress(testnet, xpub, i);
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
exports.generatePrivateKeyFromMnemonic = (currency, testnet, mnemonic, i) => {
    switch (currency) {
        case model_1.Currency.BTC:
            return generateBtcPrivateKey(testnet, mnemonic, i);
        case model_1.Currency.ADA:
            return generateAdaPrivateKey(testnet, mnemonic, i);
        case model_1.Currency.LTC:
            return generateLtcPrivateKey(testnet, mnemonic, i);
        case model_1.Currency.BCH:
            return generateBchPrivateKey(testnet, mnemonic, i);
        case model_1.Currency.USDT:
        case model_1.Currency.LEO:
        case model_1.Currency.LINK:
        case model_1.Currency.UNI:
        case model_1.Currency.FREE:
        case model_1.Currency.MKR:
        case model_1.Currency.USDC:
        case model_1.Currency.BAT:
        case model_1.Currency.TUSD:
        case model_1.Currency.PAX:
        case model_1.Currency.PAXG:
        case model_1.Currency.PLTC:
        case model_1.Currency.XCON:
        case model_1.Currency.ETH:
        case model_1.Currency.MMY:
            return generateEthPrivateKey(testnet, mnemonic, i);
        case model_1.Currency.VET:
            return generateVetPrivateKey(testnet, mnemonic, i);
        case model_1.Currency.LYRA:
            return generateLyraPrivateKey(testnet, mnemonic, i);
        default:
            throw new Error('Unsupported blockchain.');
    }
};
/**
 * Generate address from private key
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param privkey private key to use
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
exports.generateAddressFromPrivatekey = (currency, testnet, privatekey) => {
    switch (currency) {
        case model_1.Currency.BTC:
            return convertBtcPrivateKey(testnet, privatekey);
        default:
            throw new Error('Unsupported blockchain.');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93YWxsZXQvYWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBMkM7QUFDM0MsaUNBQXFDO0FBQ3JDLDJDQUE0QztBQUM1QyxpREFBeUQ7QUFDekQsbURBT3dCO0FBQ3hCLHlEQUFvRDtBQUNwRCxhQUFhO0FBQ2IsNENBWXNCO0FBQ3RCLG9DQUFrQztBQUVsQzs7Ozs7O0dBTUc7QUFDSCxNQUFNLGtCQUFrQixHQUFHLENBQUMsT0FBZ0IsRUFBRSxJQUFZLEVBQUUsQ0FBUyxFQUFFLEVBQUU7SUFDckUsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyx3QkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsd0JBQVEsQ0FBQyxPQUFPLENBQUM7SUFDOUQsTUFBTSxDQUFDLEdBQUcsa0JBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFELE9BQU8sd0JBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDLE9BQWlCLENBQUM7QUFDNUUsQ0FBQyxDQUFDO0FBRUY7Ozs7OztHQU1HO0FBQ0gsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLE9BQWdCLEVBQUUsSUFBWSxFQUFFLENBQVMsRUFBRSxFQUFFO0lBQ3JFLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsbUNBQWtCLENBQUMsU0FBUyxDQUFDLEVBQUMsY0FBYyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLG1DQUFrQixDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3BILE9BQU8saUNBQWdCLENBQUMsR0FBRyxDQUFDLDBCQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLGlD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